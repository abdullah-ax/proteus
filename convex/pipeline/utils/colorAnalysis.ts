import sharp from "sharp";

export interface ColorHistogram {
  redMean: number;
  greenMean: number;
  blueMean: number;
  redDeficiency: number;
}

export async function analyzeColorHistogram(
  imageBuffer: ArrayBuffer
): Promise<ColorHistogram> {
  const { channels } = await sharp(Buffer.from(imageBuffer)).stats();
  const [r, g, b] = channels;

  const redMean = r.mean;
  const greenMean = g.mean;
  const blueMean = b.mean;

  const avgGB = (greenMean + blueMean) / 2;
  const redDeficiency = avgGB > 0 ? Math.max(0, 1 - redMean / avgGB) : 0;

  return { redMean, greenMean, blueMean, redDeficiency };
}

export function needsRecoloration(histogram: ColorHistogram): boolean {
  return histogram.redDeficiency > 0.3;
}
