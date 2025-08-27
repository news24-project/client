import { customAxios } from "./customAxios";

export interface IArticle {
  id: string;
  title: string;
  url: string;
  summary: string | null;
  content: string | null;
  imageUrl: string | null;
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
    const response = await customAxios.get<
      {
        id: string;
        name: string;
        createdAt: string;
        articleTags: { article: IArticle }[];
      }[]
    >("/article-tags");

    return response.data.flatMap((cat) =>
      cat.articleTags.map((tag) => tag.article)
    );
  } catch (error) {
    console.error("findAllArticles Error:", error);
    throw error;
  }
}
