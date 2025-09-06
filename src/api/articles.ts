import { customAxios } from "./customAxios";

export interface IArticle {
  id: string;
  name: string;
  createdAt?: string;
  articleTags: IArticleChild[];
}

export interface IArticleChild {
  id: string;
  title: string;
  url: string;
  summary: string | null;
  content: string | null;
  imageUrl?: string | null;
  author: string | null;
  publishedAt: string;
  type: string;
  score: number;
  createdAt: string;
  sourceId: string;
  iconUrl: string | null;
}

export async function findAllArticles(): Promise<IArticle[]> {
  try {
    const response = await customAxios.get<IArticle[]>("/article-tags");

    return response.data;
  } catch (error) {
    console.error("findAllArticles Error:", error);
    throw error;
  }
}
