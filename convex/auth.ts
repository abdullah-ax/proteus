import { AuthKit } from "@convex-dev/workos-authkit";
import type { DataModel } from "./_generated/dataModel";
import { components } from "./_generated/api";

export const authKit = new AuthKit<DataModel>(components.workOSAuthKit);
