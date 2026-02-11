/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as fishDetections from "../fishDetections.js";
import type * as http from "../http.js";
import type * as images from "../images.js";
import type * as pipeline_run from "../pipeline/run.js";
import type * as pipeline_stages_classification from "../pipeline/stages/classification.js";
import type * as pipeline_stages_duplicateCheck from "../pipeline/stages/duplicateCheck.js";
import type * as pipeline_stages_fishExtraction from "../pipeline/stages/fishExtraction.js";
import type * as pipeline_stages_metadata from "../pipeline/stages/metadata.js";
import type * as pipeline_stages_recoloration from "../pipeline/stages/recoloration.js";
import type * as pipeline_types from "../pipeline/types.js";
import type * as pipeline_utils_colorAnalysis from "../pipeline/utils/colorAnalysis.js";
import type * as pipeline_utils_phash from "../pipeline/utils/phash.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  fishDetections: typeof fishDetections;
  http: typeof http;
  images: typeof images;
  "pipeline/run": typeof pipeline_run;
  "pipeline/stages/classification": typeof pipeline_stages_classification;
  "pipeline/stages/duplicateCheck": typeof pipeline_stages_duplicateCheck;
  "pipeline/stages/fishExtraction": typeof pipeline_stages_fishExtraction;
  "pipeline/stages/metadata": typeof pipeline_stages_metadata;
  "pipeline/stages/recoloration": typeof pipeline_stages_recoloration;
  "pipeline/types": typeof pipeline_types;
  "pipeline/utils/colorAnalysis": typeof pipeline_utils_colorAnalysis;
  "pipeline/utils/phash": typeof pipeline_utils_phash;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  workOSAuthKit: {
    lib: {
      enqueueWebhookEvent: FunctionReference<
        "mutation",
        "internal",
        {
          apiKey: string;
          event: string;
          eventId: string;
          eventTypes?: Array<string>;
          logLevel?: "DEBUG";
          onEventHandle?: string;
          updatedAt?: string;
        },
        any
      >;
      getAuthUser: FunctionReference<
        "query",
        "internal",
        { id: string },
        {
          createdAt: string;
          email: string;
          emailVerified: boolean;
          externalId?: null | string;
          firstName?: null | string;
          id: string;
          lastName?: null | string;
          lastSignInAt?: null | string;
          locale?: null | string;
          metadata: Record<string, any>;
          profilePictureUrl?: null | string;
          updatedAt: string;
        } | null
      >;
    };
  };
};
