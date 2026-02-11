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
          text: `Identify the primary fish species visible in this underwater photograph. Focus ONLY on the fish, not the scene or environment.

Return ONLY valid JSON in this exact format:
{
  "species": "Genus species (scientific name)",
  "commonName": "Common name of the fish",
  "confidence": 0.85,
  "family": "Family name (e.g., Chaetodontidae, Pomacentridae)",
  "characteristics": "Key identifying features of THIS SPECIFIC FISH ONLY (colors, patterns, body shape, fins)",
  "conservationStatus": "IUCN status or Unknown"
}

Rules:
- Identify the most prominent/visible fish species
- Be specific about scientific classification
- characteristics should ONLY describe the fish itself, not the scene
- If multiple fish, focus on the largest/most visible one
- Give lower confidence if uncertain`,
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
