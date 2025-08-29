"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { customAxios } from "@/api/customAxios";
import Card from "@/components/card/Card";
import cls from "../country/[sulg]/Country.module.css";

const BACKEND_URL = "http://localhost:4000";

const World = () => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const formatArticle = (article: any) => ({
    ...article,
    iconUrl: article?.iconUrl ? `${BACKEND_URL}/${article.iconUrl}` : "",
  });

  const countryCodes = ["en"];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        let allArticles: any[] = [];

        for (const code of countryCodes) {
          const { data } = await customAxios.get(`/article-tags/${code}`);
          if (data?.data?.length) {
            const formatted = data.data
              .map((item: any) => formatArticle(item.article || item))
              .filter((item: any) => item.imageUrl); // imageUrl bo‘lmaganlarni tashlaymiz
            allArticles = [...allArticles, ...formatted];
          }
        }

        setArticles(
          allArticles.sort(
            (a, b) =>
              new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          )
        );
      } catch (err) {
        console.error("Error fetching all articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [lang]);

  return (
    <div className={cls["container"]}>
      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p>No articles found</p>
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
};

export default World;
