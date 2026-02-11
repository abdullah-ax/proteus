"use node";

import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import type { PipelineState } from "../types";

export async function classifyFish(
  state: PipelineState
): Promise<PipelineState> {
  if (!state.fishDetections || state.fishDetections.length === 0) {
    return { ...state, classifications: [] };
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY environment variable is not set");

  const model = new ChatOpenAI({
    modelName: "google/gemma-3-27b:free",
    temperature: 0,
    openAIApiKey: apiKey,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  });

  const classifications = [];

  for (let i = 0; i < state.fishDetections.length; i++) {
    const detection = state.fishDetections[i];
    if (!detection.croppedBuffer) continue;

    const base64 = Buffer.from(detection.croppedBuffer).toString("base64");

    const response = await model.invoke([
      new HumanMessage({
        content: [
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${base64}` },
          },
          {
            type: "text",
            text: `Identify the species of this fish from the Red Sea. This is a cropped image from an underwater photograph taken in the Red Sea region.
Return ONLY valid JSON:
{
  "species": "Scientific name (Genus species)",
  "commonName": "Common English name",
  "confidence": 0.85,
  "family": "Family name",
  "characteristics": "Brief identifying features",
  "conservationStatus": "IUCN status if known, otherwise Unknown"
}
Focus on Red Sea endemic and common species. If uncertain, give your best assessment with a lower confidence score.`,
          },
        ],
      }),
    ]);

    const content =
      typeof response.content === "string" ? response.content : "";
    const jsonMatch = content.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        classifications.push({
          detectionIndex: i,
          species: parsed.species ?? "Unknown",
          commonName: parsed.commonName ?? "Unknown",
          confidence: parsed.confidence ?? 0,
          details: JSON.stringify({
            family: parsed.family,
            characteristics: parsed.characteristics,
            conservationStatus: parsed.conservationStatus,
          }),
        });
      } catch {
        classifications.push({
          detectionIndex: i,
          species: "Unknown",
          commonName: "Unknown",
          confidence: 0,
        });
      }
    } else {
      classifications.push({
        detectionIndex: i,
        species: "Unknown",
        commonName: "Unknown",
        confidence: 0,
      });
    }
  }

  return { ...state, classifications };
}
