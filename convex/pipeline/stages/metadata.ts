"use node";

import exifr from "exifr";
import type { PipelineState } from "../types";

const RED_SEA_BOUNDS = {
  minLat: 12.0,
  maxLat: 30.0,
  minLon: 32.0,
  maxLon: 44.0,
};

function isInRedSea(lat: number, lon: number): boolean {
  return (
    lat >= RED_SEA_BOUNDS.minLat &&
    lat <= RED_SEA_BOUNDS.maxLat &&
    lon >= RED_SEA_BOUNDS.minLon &&
    lon <= RED_SEA_BOUNDS.maxLon
  );
}

export async function extractMetadata(
  state: PipelineState
): Promise<PipelineState> {
  const exifData = await exifr.parse(Buffer.from(state.imageBuffer), {
    gps: true,
    pick: [
      "DateTimeOriginal",
      "Make",
      "Model",
      "GPSLatitude",
      "GPSLongitude",
    ],
  });

  const exif = {
    latitude: exifData?.latitude as number | undefined,
    longitude: exifData?.longitude as number | undefined,
    timestamp: exifData?.DateTimeOriginal
      ? new Date(exifData.DateTimeOriginal).toISOString()
      : undefined,
    camera: exifData
      ? `${exifData.Make ?? ""} ${exifData.Model ?? ""}`.trim() || undefined
      : undefined,
  };

  let isRedSeaVerified: boolean;
  if (exif.latitude !== undefined && exif.longitude !== undefined) {
    isRedSeaVerified = isInRedSea(exif.latitude, exif.longitude);
    if (!isRedSeaVerified) {
      throw new Error(
        `Image GPS coordinates (${exif.latitude.toFixed(4)}, ${exif.longitude.toFixed(4)}) are outside the Red Sea region`
      );
    }
  } else {
    // No GPS data — warn but allow through
    isRedSeaVerified = false;
  }

  return { ...state, exif, isRedSeaVerified };
}
