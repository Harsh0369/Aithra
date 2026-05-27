import { fetchTranscript } from "youtube-transcript/dist/youtube-transcript.esm.js";

export const fetchVideoTranscript = async (videoUrl: string,lang:string="en"): Promise<string | null> => { 
    try {
      const result = await fetchTranscript(videoUrl, { lang });
      const text = result
        .map((item: { text: string }) => item.text.trim())
        .filter(Boolean)
        .join(" ");

      if (!text) { 
        console.log(
          "Transcript fetched, but text is empty for this video/language.",
        );
      } else {
        console.log("Transcript length:", text.length);
        console.log(text);
      }
      return text;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Failed to fetch transcript:", message);
      return null;
    }
}


