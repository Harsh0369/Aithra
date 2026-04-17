export interface PDFIndexRequest {
    documentId: string;
    filePath: string;
}

export interface PDFQuestionRequest {
    documentId: string;
    question: string;
    topK?: number;
}

export interface PDFSummaryRequest {
    documentId: string;
    topK?: number;
}

export interface PDFIndexResponse {
    documentId: string;
    chunks: number;
    source: string;
}

export interface PDFAnswerResponse {
    documentId: string;
    answer: string;
    sources: Array<{
        contentPreiew: string;
        source: string;
        page?: number;
    }>;
}

export interface PDFSummaryResponse {
    documentId: string;
    summary: string;
    chunksUsed: number;
}