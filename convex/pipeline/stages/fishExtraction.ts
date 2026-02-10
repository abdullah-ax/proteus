"use node";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { Jimp } from "jimp";
import type { ActionCtx } from "../../_generated/server";
import type { PipelineState } from "../types";

export async function extractFish(
  state: PipelineState,
  ctx: ActionCtx
): Promise<PipelineState> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_API_KEY environment variable is not set");

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
    apiKey,
  });

  const imageBuffer = state.recoloredBuffer ?? state.imageBuffer;
  const base64 = Buffer.from(imageBuffer).toString("base64");

  const response = await model.invoke([
    new HumanMessage({
      content: [
        {
          type: "image_url",
          image_url: { url: `data:image/jpeg;base64,${base64}` },
        },
        {
          type: "text",
          text: `Analyze this underwater photograph. Identify every distinct fish visible in the image.
For each fish, provide a bounding box as normalized coordinates (0 to 1) relative to image dimensions.
Return ONLY valid JSON in this exact format:
{
  "fish": [
    { "x": 0.1, "y": 0.2, "width": 0.15, "height": 0.1 }
  ]
}
If no fish are visible, return {"fish": []}.
Be thorough — include partially visible fish at edges. Do not include other marine life (coral, invertebrates) unless they are fish.`,
        },
      ],
    }),
  ]);

  const content =
    typeof response.content === "string" ? response.content : "";
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return { ...state, fishDetections: [] };
  }

  const parsed = JSON.parse(jsonMatch[0]);
  if (!parsed.fish || parsed.fish.length === 0) {
    return { ...state, fishDetections: [] };
  }

  const image = await Jimp.read(Buffer.from(imageBuffer));
  const imgWidth = image.bitmap.width;
  const imgHeight = image.bitmap.height;

  const detections = [];
  for (const fish of parsed.fish) {
    // Add 10% padding around bounding box
    const pad = 0.1;
    const x = Math.max(0, fish.x - fish.width * pad);
    const y = Math.max(0, fish.y - fish.height * pad);
    const w = Math.min(1 - x, fish.width * (1 + 2 * pad));
    const h = Math.min(1 - y, fish.height * (1 + 2 * pad));

    const left = Math.round(x * imgWidth);
    const top = Math.round(y * imgHeight);
    const width = Math.max(1, Math.round(w * imgWidth));
    const height = Math.max(1, Math.round(h * imgHeight));

    const cropped = await image
      .clone()
      .crop(left, top, width, height)
      .quality(90)
      .getBufferAsync(Jimp.MIME_JPEG);

    const blob = new Blob([cropped]);
    const croppedStorageId = await ctx.storage.store(blob);

    detections.push({
      bbox: { x: fish.x, y: fish.y, width: fish.width, height: fish.height },
      croppedBuffer: cropped.buffer.slice(
        cropped.byteOffset,
        cropped.byteOffset + cropped.byteLength
      ),
      croppedStorageId,
    });
  }

  return { ...state, fishDetections: detections };
}
