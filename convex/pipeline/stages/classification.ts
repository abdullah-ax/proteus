"use node";

import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import type { PipelineState } from "../types";

export async function classifyFish(
  state: PipelineState
): Promise<PipelineState> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY environment variable is not set");

  const model = new ChatOpenAI({
    modelName: "google/gemma-3-27b-it:free",
    temperature: 0,
    openAIApiKey: apiKey,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  });

  const classifications = [];

  // For testing: analyze the full image instead of cropped detections
  const base64 = Buffer.from(state.imageBuffer).toString("base64");

  const response = await model.invoke([
    new HumanMessage({
      content: [
        {
          type: "image_url",
          image_url: { url: `data:image/jpeg;base64,${base64}` },
        },
        {
          type: "text",
          text: `Testing API connection. Describe what you see in this image in one sentence.
Return ONLY valid JSON:
{
  "species": "Test response",
  "commonName": "API Working",
  "confidence": 1.0,
  "family": "Test",
  "characteristics": "Your description here",
  "conservationStatus": "OK"
}`,
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
        detectionIndex: 0,
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
        detectionIndex: 0,
        species: "Parse Error",
        commonName: "JSON Parse Failed",
        confidence: 0,
      });
    }
  } else {
    classifications.push({
      detectionIndex: 0,
      species: "No Match",
      commonName: "No JSON Found",
      confidence: 0,
    });
  }

  return { ...state, classifications };
}
