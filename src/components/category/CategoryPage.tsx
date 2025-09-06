"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { customAxios } from "@/api/customAxios";
import CategoryHeader from "@/components/CategoryHeader";
import Card from "@/components/card/Card";
import cls from "./Category.module.css";
import LoadingCard from "@/components/LoadingCard";

interface Tag {
  id: string;
  name: string;
}

interface CategoryPageProps {
  title: string;
  image?: string;
}

const BACKEND_URL = "https://news24.muhammad-yusuf.uz";

const categoryData: { [key: string]: { icon: string; color: string } } = {
  technology: { icon: "/images/technology.webp", color: "#039be5" },
  sports: { icon: "/images/sports.webp", color: "#ef6c00" },
  science: { icon: "/images/science.webp", color: "#e91e63" },
  entertainment: { icon: "/images/entertainment.webp", color: "#6A1B9A" },
  health: { icon: "/images/health.webp", color: "#5677fc" },
  business: { icon: "/images/business.webp", color: "#259b24" },
  world: { icon: "/images/world1.webp", color: "#689f38" },
};

const formatArticle = (article: any) => ({
  ...article,
  iconUrl: article.iconUrl ? `${BACKEND_URL}/${article.iconUrl}` : "",
});

const sortByDateDesc = (articles: any[]) =>
  articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

const CategoryPage: React.FC<CategoryPageProps> = ({ title, image }) => {
  const [selectedTagId, setSelectedTagId] = useState<string>("latest");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const key = title.toLowerCase();
  const categoryInfo = categoryData[key] || categoryData["world"];

  // 🔹 Tagsni olish query
  const {
    data: tags = [],
    isLoading: tagsLoading,
    isError: tagsError,
  } = useQuery<Tag[]>({
    queryKey: ["tags", id],
    queryFn: async () => {
      const { data } = await customAxios.get(`/categories/${id}`);
      return data.data || [];
    },
    enabled: !!id,
  });

  // 🔹 Maqolalarni olish query
  const {
    data: tagArticles = [],
    isLoading: articlesLoading,
    isError: articlesError,
  } = useQuery<any[]>({
    queryKey: ["articles", selectedTagId, id],
    queryFn: async () => {
      if (!id || tags.length === 0) return [];

      if (selectedTagId === "latest") {
        const articlesArrays = await Promise.all(
          tags.map((tag) =>
            customAxios
              .get(`/article-tags/tag/${tag.id}`)
              .then((res) =>
                res.data.articleTags
                  ? res.data.articleTags
                      .map((item: any) => formatArticle(item.article))
                      .filter((article: any) => article.imageUrl)
                  : []
              )
              .catch(() => [])
          )
        );

        return sortByDateDesc(articlesArrays.flat());
      } else {
        const { data } = await customAxios.get(
          `/article-tags/tag/${selectedTagId}`
        );
        return data.articleTags
          ? sortByDateDesc(
              data.articleTags
                .map((item: any) => formatArticle(item.article))
                .filter((article: any) => article.imageUrl)
            )
          : [];
      }
    },
    enabled: !!id && tags.length > 0,
  });

  const loading = tagsLoading || articlesLoading;

  return (
    <div className={cls.container}>
      <CategoryHeader
        id={id as string}
        title={title}
        image={categoryInfo.icon}
        backgroundColor={categoryInfo.color}
        categories={tags.length > 0 ? tags.map((tag) => tag.name) : undefined}
        activeIndex={
          tags.length > 0
            ? selectedTagId === "latest"
              ? 0
              : tags.findIndex((tag) => tag.id === selectedTagId) + 1
            : undefined
        }
        onTagClick={(index) => {
          if (tags.length === 0) return;
          if (index === 0) setSelectedTagId("latest");
          else setSelectedTagId(tags[index - 1]?.id);
        }}
      />

      {loading ? (
        <LoadingCard count={3} />
      ) : tagArticles.length === 0 ? (
        <p>No articles found</p>
      ) : (
        <div className={cls["article-container"]}>
          {tagArticles
            .filter((_, idx) => idx % 3 === 0)
            .map((_, groupIdx) => (
              <Card
                key={groupIdx}
                cardMain={tagArticles[groupIdx * 3]}
                smallCardOA
                cards={tagArticles.slice(groupIdx * 3, groupIdx * 3 + 3)}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
