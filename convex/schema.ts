import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    workosUserId: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string())
  }).index("by_workos_user_id", ["workosUserId"]),
  submissions: defineTable({
    status: v.optional(v.string()),
    createdAt: v.number()
  }).index("by_created_at", ["createdAt"])
});
