import { model, Schema } from "mongoose";
import type { InferSchemaType, HydratedDocument } from "mongoose";


// Define the Mongoose schema for transcript chunks
const chunkSchema = new Schema(
    {
        videoId: { type: String, required: true },
        text: { type: String, required: true },
        startTime: { type: Number, required: true },
        endTime: { type: Number, required: true },
    },
    { timestamps: true },
);

//type inference
type Chunk = InferSchemaType<typeof chunkSchema>;
export type ChunkDocument = HydratedDocument<Chunk>;

//Indexes
chunkSchema.index({ videoId: 1 });


export const ChunkModel = model<ChunkDocument>("Chunk", chunkSchema);