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
  const [selectedTagId, setSelectedTagId] = useState<string | null>("all");
  const [tagArticles, setTagArticles] = useState<any[]>([]);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const country = searchParams.get("country") || "america";

  // Tagsni olish
  useEffect(() => {
    if (!id) return;
    const fetchTags = async () => {
      try {
        const { data } = await customAxios.get(
          `/categories/${id}?country=${country}`
        );
        setTags(data?.data || []);
      } catch (err) {
        console.error(err);
        setTags([]);
      }
    };
    fetchTags();
  }, [id, country]);

  // Maqolalarni olish
  useEffect(() => {
    if (!id) return;

    const fetchArticles = async () => {
      try {
        if (selectedTagId === "all") {
          const { data } = await customAxios.get(
            `/categories/${id}?country=${country}`
          );
          const allArticles = (data?.data || [])
            .map((tag: any) => tag.articles || [])
            .flat()
            .reverse();
          setTagArticles(allArticles);
        } else {
          const { data } = await customAxios.get(
            `/article-tags/tag/${selectedTagId}`
          );
          const articles = (data?.articleTags || [])
            .map((item: any) => item.article || [])
            .flat()
            .reverse();
          setTagArticles(articles);
        }
      } catch (err) {
        console.error(err);
        setTagArticles([]);
      }
    };

    fetchArticles();
  }, [selectedTagId, id, country]);

  return (
    <div className={cls.container}>
      <CategoryHeader
        title={title}
        icon={icon}
        categories={tags.map((tag) => tag.name)}
        onTagClick={(index) => {
          if (index === 0) {
            setSelectedTagId("all");
          } else {
            setSelectedTagId(tags[index - 1]?.id || null);
          }
        }}
      />

      <div className={cls["article-container"]}>
        {tagArticles.length > 0 &&
          tagArticles.map((article, idx) => (
            <Card
              key={article.id || idx}
              cardMain={article}
              smallCardOA={idx === 0}
              cards={idx === 1 ? tagArticles.slice(2) : undefined}
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
