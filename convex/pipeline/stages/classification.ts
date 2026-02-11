"use node";

import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import type { PipelineState } from "../types";
import { RED_SEA_SPECIES_LIST_TEXT, isRedSeaSpecies, findRedSeaSpecies } from "../data/redSeaSpecies";

const CONFIDENCE_THRESHOLD = 0.7;

export async function classifyFish(
  state: PipelineState
): Promise<PipelineState> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY environment variable is not set");

  const model = new ChatOpenAI({
    modelName: "google/gemini-3-flash-preview",
    temperature: 0,
    openAIApiKey: apiKey,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  });

  const classifications = [];

  const speciesList = RED_SEA_SPECIES_LIST_TEXT;

  // If no fish detections, analyze full image (fallback for testing)
  const fishToClassify = state.fishDetections && state.fishDetections.length > 0
    ? state.fishDetections
    : [{ bbox: { x: 0, y: 0, width: 1, height: 1 }, croppedBuffer: state.imageBuffer }];

  // Process each detected fish
  for (const [index, detection] of fishToClassify.entries()) {
    // Use cropped image if available, otherwise full image
    const imageToClassify = detection.croppedBuffer ?? state.imageBuffer;
    const base64 = Buffer.from(imageToClassify).toString("base64");

    const response = await model.invoke([
      new HumanMessage({
        content: [
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${base64}` },
          },
          {
            type: "text",
            text: `Identify this fish species. It MUST be from the Red Sea species list below.

RED SEA MARINE LIFE LIST:
${speciesList}

Return ONLY valid JSON in this exact format:
{
  "species": "Genus species",
  "commonName": "Common name",
  "confidence": 0.85,
  "family": "Family name",
  "characteristics": "Key identifying features",
  "reasoning": "Why this species was chosen"
}

CRITICAL RULES:
- ONLY identify species from the Red Sea list above
- If the fish is NOT in the list, return: species="Unknown", commonName="Not in Red Sea database", confidence=0
- Give confidence >0.7 only if you're certain it matches a Red Sea species
- Base identification on visible features: color patterns, body shape, fin structure
- Provide reasoning for your classification
- Focus ONLY on the fish itself, not the scene or environment`,
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

        // Validate against Red Sea species list
        const isValid = isRedSeaSpecies(parsed.species);
        const confidence = parsed.confidence ?? 0;

        // Apply guardrails
        if (!isValid || confidence < CONFIDENCE_THRESHOLD) {
          classifications.push({
            detectionIndex: index,
            species: "Unknown",
            commonName: "Not in Red Sea species database",
            confidence: 0,
            details: JSON.stringify({
              originalSpecies: parsed.species,
              originalConfidence: confidence,
              reason: !isValid
                ? "Species not found in Red Sea database"
                : "Confidence below threshold (0.7)",
              characteristics: parsed.characteristics,
            }),
          });
        } else {
          const redSeaSpecies = findRedSeaSpecies(parsed.species);
          classifications.push({
            detectionIndex: index,
            species: parsed.species,
            commonName: redSeaSpecies?.commonName ?? parsed.commonName,
            confidence,
            details: JSON.stringify({
              family: redSeaSpecies?.family ?? parsed.family,
              characteristics: parsed.characteristics,
              reasoning: parsed.reasoning,
            }),
          });
        }
      } catch {
        classifications.push({
          detectionIndex: index,
          species: "Parse Error",
          commonName: "JSON Parse Failed",
          confidence: 0,
        });
      }
    } else {
      classifications.push({
        detectionIndex: index,
        species: "No Match",
        commonName: "No JSON Found",
        confidence: 0,
      });
    }
  }

  return { ...state, classifications };
}
