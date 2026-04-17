import dotenv from 'dotenv';
dotenv.config();

//? SERVER CONFIG
export const PORT = process.env.PORT || 5000;
//? MONGO CONFIG
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Aithra';
//? OLLAMA CONFIG
export const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';
export const OLLAMA_CHAT_MODEL = process.env.OLLAMA_CHAT_MODEL || 'llama3';
export const OLLAMA_EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text';
