"use client";

import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { customAxios } from "@/api/customAxios";
import Card from "@/components/card/Card";
import cls from "./Country.module.css";
import CategoryPage from "@/components/category/CategoryPage";
import LoadingCard from "@/components/LoadingCard";
import NotFound from "@/app/not-found/page";

const BACKEND_URL = "https://news24.muhammad-yusuf.uz";

const formatArticle = (article: any) => ({
  ...article,
  iconUrl: article?.iconUrl ? `${BACKEND_URL}/${article.iconUrl}` : "",
});

const countryNames: Record<string, string> = {
  uz: "Uzbekistan",
  ru: "Russia",
  us: "U.S",
  tr: "Turkey",
  kz: "Kazakhstan",
  kg: "Kyrgyzstan",
  in: "India",
  zh: "China",
};

const countryImages: Record<string, string> = {
  uz: "/images/uz.webp",
  ru: "/images/ru.jpeg",
  us: "/images/us.jpeg",
  tr: "/images/tr.jpeg",
  kz: "/images/kz.jpeg",
  kg: "/images/kg.jpg",
  in: "/images/in.jpeg",
  zh: "/images/xt.jpeg",
};


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
        ? data.data.map((item: any) => formatArticle(item.article || item))
        : [];

      return [...formatted].reverse();
    },
    enabled: !!sulg,
  });

  const categoryImage = sulg && countryImages[sulg as string];
  const categoryTitle =
    sulg && (countryNames[sulg as string] || (sulg as string).toUpperCase());

  return (
    <div className={cls["container"]}>
      {categoryTitle && (
        <CategoryPage title={categoryTitle} image={categoryImage} isCountry />
      )}

      {isLoading ? (
        <LoadingCard count={3} />
      ) : isError ? (
        <p>Error loading articles</p>
      ) : articles.length === 0 ? (
        <NotFound />
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
