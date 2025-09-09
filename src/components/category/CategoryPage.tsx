"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  isCountry?: boolean;
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
  iconUrl: article?.iconUrl ? `${BACKEND_URL}/${article.iconUrl}` : "",
});

const sortByDateDesc = (articles: any[]) =>
  articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

const CategoryPage: React.FC<CategoryPageProps> = ({
  title,
  image,
  isCountry,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const idFromUrl = searchParams.get("id") || "id-null";
  const tagFromUrl = searchParams.get("tag") || "latest";

  const [selectedTagId, setSelectedTagId] = useState<string>(tagFromUrl);

  const key = title.toLowerCase();
  const categoryInfo = categoryData[key];
  const headerImage = image || categoryInfo?.icon || "";
  const headerColor = image ? undefined : categoryInfo?.color;

  const { data: tags = [], isLoading: tagsLoading } = useQuery<Tag[]>({
    queryKey: ["tags", idFromUrl],
    queryFn: async () => {
      if (!idFromUrl) return [];
      const { data } = await customAxios.get(`/categories/${idFromUrl}`);
      return data.data || [];
    },
    enabled: !!idFromUrl,
  });

  // 🔹 Articles query
  const { data: tagArticles = [], isLoading: articlesLoading } = useQuery<
    any[]
  >({
    queryKey: ["articles", selectedTagId, idFromUrl],
    queryFn: async () => {
      if (!idFromUrl || tags.length === 0) return [];

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
    enabled: !!idFromUrl && tags.length > 0,
  });

  const loading = tagsLoading || articlesLoading;

  useEffect(() => {
    if (!idFromUrl) return;

    const url = new URL(window.location.href);
    url.searchParams.set("id", idFromUrl);
    if (selectedTagId === "latest") url.searchParams.delete("tag");
    else url.searchParams.set("tag", selectedTagId);

    router.replace(
      `${window.location.pathname}?${url.searchParams.toString()}`
    );
  }, [selectedTagId, idFromUrl, router]);

  return (
    <div className={cls.container}>
      <CategoryHeader
        id={idFromUrl}
        title={title}
        image={headerImage}
        backgroundColor={headerColor}
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
        isCountry={isCountry}
      />

      {loading ? (
        <LoadingCard count={3} />
      ) : tagArticles.length === 0 ? null : (
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
