"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { customAxios } from "@/api/customAxios";
import Card from "@/components/card/Card";
import cls from "./Search.module.css";

const BACKEND_URL = "https://news24.muhammad-yusuf.uz";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const formatArticle = (article: any) => ({
    ...article,
    iconUrl: article?.iconUrl ? `${BACKEND_URL}/${article.iconUrl}` : "",
  });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await customAxios.get("/article-tags/search", {
          params: Object.fromEntries(searchParams.entries()),
        });

        const formatted = res.data
          ? res.data
              .map((item: any) => formatArticle(item))
              .filter((item: any) => item.imageUrl)
          : [];

        setArticles(formatted.reverse());
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (searchParams.toString()) {
      fetchResults();
    }
  }, [searchParams]);

  return (
    <div className={cls["container"]}>
      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p>No results found</p>
      ) : (
        <div className={cls["article-container"]}>
          {articles.map((article, idx) => (
            <Card
              key={article.id || idx}
              cardMain={article}
              smallCardOA
              cards={idx === 1 ? articles.slice(2) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
