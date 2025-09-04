"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { customAxios } from "@/api/customAxios";
import CategoryHeader from "@/components/CategoryHeader";
import Card from "@/components/card/Card";
import cls from "./Category.module.css";

interface Tag {
  id: string;
  name: string;
}

interface CategoryPageProps {
  title: string;
  icon: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ title, icon }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<string>("all");
  const [tagArticles, setTagArticles] = useState<any[]>([]);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const BACKEND_URL = "http://localhost:4000";

  const formatArticle = (article: any) => ({
    ...article,
    iconUrl: article.iconUrl ? `${BACKEND_URL}/${article.iconUrl}` : "",
  });

  const sortByDateDesc = (articles: any[]) =>
    articles.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  useEffect(() => {
    if (!id) return;
    const fetchTags = async () => {
      try {
        const { data } = await customAxios.get(`/categories/${id}`);
        setTags(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTags();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchArticles = async () => {
      try {
        if (selectedTagId === "all") {
          const articlesArrays = await Promise.all(
            tags.map((tag) =>
              customAxios
                .get(`/article-tags/tag/${tag.id}`)
                .then((res) =>
                  res.data.articleTags
                    ? res.data.articleTags
                        .map((item: any) => formatArticle(item.article))
                        .filter((article: any) => article.imageUrl) // imageUrl bo‘lmaganlarni tashlab ketish
                    : []
                )
                .catch(() => [])
            )
          );

          const allArticles = sortByDateDesc(articlesArrays.flat());
          setTagArticles(allArticles);
        } else {
          const { data } = await customAxios.get(
            `/article-tags/tag/${selectedTagId}`
          );
          setTagArticles(
            data.articleTags
              ? sortByDateDesc(
                  data.articleTags
                    .map((item: any) => formatArticle(item.article))
                    .filter((article: any) => article.imageUrl)
                )
              : []
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchArticles();
  }, [selectedTagId, tags, id]);

  return (
    <div className={cls.container}>
      <CategoryHeader
        id={id as string}
        title={title}
        icon={icon}
        categories={tags.map((tag) => tag.name)}
        activeIndex={
          selectedTagId === "all"
            ? 0
            : tags.findIndex((tag) => tag.id === selectedTagId) + 1
        }
        onTagClick={(index) => {
          if (index === 0) setSelectedTagId("all");
          else setSelectedTagId(tags[index - 1]?.id);
        }}
      />

      <div className={cls["article-container"]}>
        {tagArticles.length > 0 &&
          tagArticles.map((article, idx) => (
            <Card
              key={article.id || idx}
              cardMain={article}
              smallCardOA
              cards={idx === 1 ? tagArticles.slice(2) : undefined}
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
