import type { ActionCtx } from "../../_generated/server";
import type { PipelineState } from "../types";
import { computePHash } from "../utils/phash";

const SIMILARITY_THRESHOLD = 0.95;

export async function checkDuplicate(
  state: PipelineState,
  ctx: ActionCtx
): Promise<PipelineState> {
  const pHashVector = await computePHash(state.imageBuffer);

  const results = await ctx.vectorSearch("images", "by_phash", {
    vector: pHashVector,
    limit: 5,
    filter: (q: any) =>
      q.eq("pipelineStatus", "completed"),
  });

  const duplicate = results.find(
    (r: { _id: any; _score: number }) =>
      r._score > SIMILARITY_THRESHOLD &&
      r._id.toString() !== state.imageId.toString()
  );

  if (duplicate) {
    return {
      ...state,
      pHashVector,
      isDuplicate: true,
      duplicateOfId: duplicate._id,
    };
  }

  return { ...state, pHashVector, isDuplicate: false };
}
