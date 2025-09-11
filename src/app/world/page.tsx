"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { customAxios } from "@/api/customAxios";
import Card from "@/components/card/Card";
import cls from "../country/[sulg]/Country.module.css";
import CategoryPage from "@/components/category/CategoryPage";
import LoadingCard from "@/components/LoadingCard";

const BACKEND_URL = "https://news24.muhammad-yusuf.uz";

const formatArticle = (article: any) => ({
  ...article,
  iconUrl: article?.iconUrl ? `${BACKEND_URL}/${article.iconUrl}` : "",
});

// Til / davlat nomlari uchun mapping
const countryNames: Record<string, string> = {
  uz: "Uzbekistan",
  en: "World",
  ru: "Russia",
  fr: "France",
  de: "Germany",
};

const countryCodes = ["en"];

const World = () => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en"; // default en

  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["worldArticles", lang],
    queryFn: async () => {
      let allArticles: any[] = [];

      for (const code of countryCodes) {
        const { data } = await customAxios.get(`/article-tags/${code}`);
        if (data?.data?.length) {
          const formatted = data.data
            .map((item: any) => formatArticle(item.article || item))
            .filter((item: any) => item.imageUrl);
          allArticles = [...allArticles, ...formatted];
        }
      }

      return allArticles.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    },
    enabled: !!lang,
  });

  const categoryTitle = countryNames[lang] || lang.toUpperCase();
  console.log(categoryTitle);

  return (
    <div className={cls["container"]}>
      <CategoryPage title={categoryTitle} />

      {isLoading ? (
        <LoadingCard count={3} />
      ) : isError ? (
        <p>Error loading articles</p>
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

export default World;
