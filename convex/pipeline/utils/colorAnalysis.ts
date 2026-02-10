"use node";

import { Jimp } from "jimp";

export interface ColorHistogram {
  redMean: number;
  greenMean: number;
  blueMean: number;
  redDeficiency: number;
}

export async function analyzeColorHistogram(
  imageBuffer: ArrayBuffer
): Promise<ColorHistogram> {
  const image = await Jimp.read(Buffer.from(imageBuffer));
  const { width, height, data } = image.bitmap;

  let redSum = 0;
  let greenSum = 0;
  let blueSum = 0;
  const pixelCount = width * height;

  for (let i = 0; i < data.length; i += 4) {
    redSum += data[i];
    greenSum += data[i + 1];
    blueSum += data[i + 2];
  }

  const redMean = redSum / pixelCount;
  const greenMean = greenSum / pixelCount;
  const blueMean = blueSum / pixelCount;

  const avgGB = (greenMean + blueMean) / 2;
  const redDeficiency = avgGB > 0 ? Math.max(0, 1 - redMean / avgGB) : 0;

  return { redMean, greenMean, blueMean, redDeficiency };
}

export function needsRecoloration(histogram: ColorHistogram): boolean {
  return histogram.redDeficiency > 0.3;
}
