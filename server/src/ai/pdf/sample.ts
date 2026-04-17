import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import {
    OLLAMA_BASE_URL,
    OLLAMA_CHAT_MODEL,
    OLLAMA_EMBED_MODEL,
} from "../../config/environment.js";
import { create } from "node:domain";

export const createEmbeddings = () => {
    return new OllamaEmbeddings({
        model: OLLAMA_EMBED_MODEL,
        baseUrl: OLLAMA_BASE_URL
    });
}

export const createChatModel = () => {
    return new ChatOllama({
        model: OLLAMA_CHAT_MODEL,
        baseUrl: OLLAMA_BASE_URL,
        temperature: 0.2
    });
}

export const loadAndChunkPdf = async (filePath: string): Promise<Document[]> => {
    const loader = new PDFLoader(filePath, {
        splitPages: true
    });

    const docs = await loader.load();
    
    const splitter =  new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    })

    return await splitter.splitDocuments(docs);
}

export const createVectorStoreFromDocs = async (docs: Document[]) => {
    return await HNSWLib.fromDocuments(docs, createEmbeddings());
}

export const loadVectorStore = async (directory: string) => {
    return HNSWLib.load(directory, createEmbeddings());
}

export const buildQaPrompt = () => {
    return PromptTemplate.fromTemplate(`
    Use the following pieces of context to answer the question at the end. If you don't know the answer, say you don't know. 
    {context}
    Question: {question}
    `);
}

export const buildSummaryPrompt = () =>
  PromptTemplate.fromTemplate(
    "Create a clear, concise summary of the context below.\n" +
      "Focus on key points, important facts, and actionable insights.\n\n" +
      "Context:\n{context}"
  );