"use node";

import { Jimp } from "jimp";
import type { ActionCtx } from "../../_generated/server";
import type { PipelineState } from "../types";
import {
  analyzeColorHistogram,
  needsRecoloration,
} from "../utils/colorAnalysis";

export async function recolor(
  state: PipelineState,
  ctx: ActionCtx
): Promise<PipelineState> {
  const histogram = await analyzeColorHistogram(state.imageBuffer);

  if (!needsRecoloration(histogram)) {
    return { ...state, wasRecolored: false };
  }

  const redBoost = 1 + histogram.redDeficiency * 0.8;
  const blueReduction = Math.max(0.85, 1 - histogram.redDeficiency * 0.2);

  const image = await Jimp.read(Buffer.from(state.imageBuffer));
  const { width, height, data } = image.bitmap;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) * 4;
      const r = data[idx];
      const b = data[idx + 2];

      data[idx] = Math.max(0, Math.min(255, Math.round(r * redBoost)));
      data[idx + 2] = Math.max(
        0,
        Math.min(255, Math.round(b * blueReduction))
      );
    }
  }

  // Mild saturation boost to approximate the previous sharp modulate.
  image.color([{ apply: "saturate", params: [15] }]);

  const correctedBuffer = await image.quality(90).getBufferAsync(Jimp.MIME_JPEG);

  const blob = new Blob([correctedBuffer]);
  const recoloredStorageId = await ctx.storage.store(blob);

  return {
    ...state,
    wasRecolored: true,
    recoloredBuffer: correctedBuffer.buffer.slice(
      correctedBuffer.byteOffset,
      correctedBuffer.byteOffset + correctedBuffer.byteLength
    ),
    recoloredStorageId,
  };
}
