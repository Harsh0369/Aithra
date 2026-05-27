import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";

export const splitTextIntoChunks = async (
  text: string,
  metadata: Record<string, any> = {},
  chunkSize: number = 800,
  chunkOverlap: number = 160,
): Promise<Document[]> => {
  if (chunkOverlap >= chunkSize) {
    throw new Error("chunkOverlap must be smaller than chunkSize");
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap,
  });

  const docs = await splitter.createDocuments([text], [metadata]);

  return docs.map((doc, index) => ({
    ...doc,
    metadata: {
      ...doc.metadata,
      chunkIndex: index,
    },
  }));
};
