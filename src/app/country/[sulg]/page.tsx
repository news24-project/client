"use client";

import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { customAxios } from "@/api/customAxios";
import Card from "@/components/card/Card";
import cls from "./Country.module.css";

const BACKEND_URL = "https://news24.muhammad-yusuf.uz";

const formatArticle = (article: any) => ({
  ...article,
  iconUrl: article?.iconUrl ? `${BACKEND_URL}/${article.iconUrl}` : "",
});

const Country = () => {
  const { sulg } = useParams();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

 
  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["countryArticles", sulg, lang],
    queryFn: async () => {
      const { data } = await customAxios.get(`/article-tags/${sulg}`, {
        params: { lang },
      });

      const formatted = data?.data
        ? data.data
            .map((item: any) => formatArticle(item.article || item))
            .filter((item: any) => item.imageUrl)
        : [];

      return formatted.reverse();
    },
    enabled: !!sulg, 
  });

  return (
    <div className={cls["container"]}>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading articles</p>
      ) : articles.length === 0 ? (
        <p>No articles found for {sulg}</p>
      ) : (
        <div className={cls["article-container"]}>
          {articles
            .filter((_: any, idx: number) => idx % 3 === 0)
            .map((_: any, groupIdx: number) => (
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
