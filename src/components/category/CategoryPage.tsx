"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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

const CategoryPage: React.FC<CategoryPageProps> = ({ title, image }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<string>("latest");
  const [tagArticles, setTagArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // loading state

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const BACKEND_URL = "http://localhost:4000";

  const categoryData: { [key: string]: { icon: string; color: string } } = {
    technology: { icon: "/images/technology.webp", color: "#039be5" },
    sports: { icon: "/images/sports.webp", color: "#ef6c00" },
    science: { icon: "/images/science.webp", color: "#e91e63" },
    entertainment: { icon: "/images/entertainment.webp", color: "#6A1B9A" },
    health: { icon: "/images/health.webp", color: "#5677fc" },
    business: { icon: "/images/business.webp", color: "#259b24" },
    world: { icon: "/images/world1.webp", color: "#689f38" },
  };

  const key = title.toLowerCase();
  const categoryInfo = categoryData[key] || categoryData["world"];

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
        setLoading(true); // loading boshlanadi
        const { data } = await customAxios.get(`/categories/${id}`);
        setTags(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // loading tugaydi
      }
    };
    fetchTags();
  }, [id]);

  useEffect(() => {
    if (!id || tags.length === 0) return;

    const fetchArticles = async () => {
      try {
        setLoading(true); // loading boshlanadi
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
      } finally {
        setLoading(false); // loading tugaydi
      }
    };

    fetchArticles();
  }, [selectedTagId, tags, id]);

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
        <LoadingCard count={3} /> // loading paytida skeleton
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
