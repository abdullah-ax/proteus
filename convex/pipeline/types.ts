import { Id } from "../_generated/dataModel";

export interface PipelineState {
  imageId: Id<"images">;
  storageId: Id<"_storage">;
  imageBuffer: ArrayBuffer;

  // Stage 2: Metadata
  exif?: {
    latitude?: number;
    longitude?: number;
    timestamp?: string;
    camera?: string;
  };
  isRedSeaVerified?: boolean;

  // Stage 3: Duplicate check
  pHashVector?: number[];
  isDuplicate?: boolean;
  duplicateOfId?: Id<"images">;

  // Stage 4: Recoloration
  recoloredBuffer?: ArrayBufferLike;
  recoloredStorageId?: Id<"_storage">;
  wasRecolored?: boolean;

  // Stage 5: Fish extraction
  fishDetections?: Array<{
    bbox: { x: number; y: number; width: number; height: number };
    croppedBuffer?: ArrayBufferLike;
    croppedStorageId?: Id<"_storage">;
  }>;

  // Stage 6: Classification
  classifications?: Array<{
    detectionIndex: number;
    species: string;
    commonName: string;
    confidence: number;
    details?: string;
  }>;
}
