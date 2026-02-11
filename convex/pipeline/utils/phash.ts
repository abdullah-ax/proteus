"use node";

import { Jimp } from "jimp";

export async function computePHash(imageBuffer: ArrayBuffer): Promise<number[]> {
  const image = await Jimp.read(Buffer.from(imageBuffer));
  image.greyscale().resize({ w: 8, h: 8 });

  const values: number[] = [];
  const { data } = image.bitmap;
  for (let i = 0; i < data.length; i += 4) {
    values.push(data[i]); // grayscale so R = G = B
  }
  const mean = values.reduce((a, b) => a + b, 0) / values.length;

  return values.map((v) => (v >= mean ? 1.0 : 0.0));
}
