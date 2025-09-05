"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { customAxios } from "@/api/customAxios";
import Card from "@/components/card/Card";
import cls from "./Country.module.css";
import CategoryPage from "@/components/category/CategoryPage";

const BACKEND_URL = "http://localhost:4000";

const Country = () => {
  const { sulg } = useParams();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const formatArticle = (article: any) => ({
    ...article,
    iconUrl: article?.iconUrl ? `${BACKEND_URL}/${article.iconUrl}` : "",
  });

  useEffect(() => {
    if (!sulg) return;

    const fetchArticles = async () => {
      try {
        setLoading(true);
        const { data } = await customAxios.get(`/article-tags/${sulg}`, {
          params: { lang },
        });

        const formatted = data?.data
          ? data.data
              .map((item: any) => formatArticle(item.article || item))
              .filter((item: any) => item.imageUrl) 
          : [];

        setArticles(formatted.reverse());
      } catch (err) {
        console.error("Error fetching country articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [sulg, lang]);

  return (

    <div className={cls["container"]}>
      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p>No articles found for {sulg}</p>
      ) : (
        <div className={cls["article-container"]}>
          {articles
            .filter((_, idx) => idx % 3 === 0)
            .map((_, groupIdx) => (
              <Card
                key={groupIdx}
                cardMain={articles[groupIdx * 3]} 
                smallCardOA
                cards={articles.slice(groupIdx * 3, groupIdx * 3 + 3)} 
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Country;
