import type { Request, Response } from "express";
import {
  ValidationError,
  NotFoundError,
  AppError,
} from "../../utils/errors.util.js";
import { fetchVideoTranscript } from "../../services/videos/fetch-transcript.service.js";
import {splitTextIntoChunks} from "../../utils/splitter.util.js";

const summarizeVideo = async (req: Request, res: Response) => {
  try {
    const { videoUrl, lang } = req.body;
    if (!videoUrl) {
      throw new ValidationError("videoUrl is required");
    }
    if (!lang) {
      throw new ValidationError("lang is required");
    }
    // Call the service to fetch the transcript
    const transcript = await fetchVideoTranscript(videoUrl, lang);

    if (!transcript) {
      throw new NotFoundError("Transcript not found for the provided video URL and language");
    }

    // Split the transcript into chunks
    const chunks = await splitTextIntoChunks(transcript, { videoUrl, lang });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Failed to fetch transcript:", message);
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    res.status(statusCode).json({ message,error: "Failed to fetch transcript" });
  }
};
