import sharp from "sharp";
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

  const correctedBuffer = await sharp(Buffer.from(state.imageBuffer))
    .recomb([
      [redBoost, 0, 0],
      [0, 1, 0],
      [0, 0, blueReduction],
    ])
    .modulate({ saturation: 1.15 })
    .normalize()
    .jpeg()
    .toBuffer();

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
