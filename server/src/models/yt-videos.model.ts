import { model, Schema } from "mongoose";
import type { InferSchemaType, HydratedDocument } from "mongoose";
import { statusEnum } from "./custom-data-types.model.js";

// Define the Mongoose schema for YouTube videos
const ytVideoSchema = new Schema(
  {
    videoId: { type: String, required: true },
    videoUrl: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, enum: statusEnum, default: "pending" },
  },
  { timestamps: true },
);

// Infer the TypeScript type from the Mongoose schema
type YtVideo = InferSchemaType<typeof ytVideoSchema>;
export type YtVideoDocument = HydratedDocument<YtVideo>;

//Indexes
ytVideoSchema.index({ videoId: 1 });
ytVideoSchema.index({ status: 1 });

export const YtVideoModel = model<YtVideoDocument>("YtVideo", ytVideoSchema);
