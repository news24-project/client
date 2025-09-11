"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FiSliders, FiInfo } from "react-icons/fi";
import styles from "./Local.module.css";
import Link from "next/link";
import { customAxios } from "@/api/customAxios";
import Card from "@/components/card/Card";
import cls from "../country/[sulg]/Country.module.css";
import LoadingCard from "@/components/LoadingCard";

const BACKEND_URL = "https://news24.muhammad-yusuf.uz";

const LocalNews: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URLdan tilni olish, default uz
  const langFromUrl = searchParams.get("lang") || "uz";

  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const formatArticle = (article: any) => ({
    ...article,
    iconUrl: article?.iconUrl ? `${BACKEND_URL}/${article.iconUrl}` : "",
  });

  // Ma'lumotlarni backenddan olish
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const { data } = await customAxios.get(`/article-tags/${langFromUrl}`);
        if (data?.data?.length) {
          const formatted = data.data
            .map((item: any) => formatArticle(item.article || item))
            .filter((item: any) => item.imageUrl);

          setArticles(
            formatted.sort(
              (a: any, b: any) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
            )
          );
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error("Local news fetch error:", error);
        setIsError(true);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [langFromUrl]);

  // URL parametrini refreshda saqlash
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", langFromUrl);
    router.replace(url.toString());
  }, [langFromUrl, router]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Your local news</h1>

        <div className={styles.controls}>
          <div className={styles.leftControls}>
            <button className={styles.locationButton}>Tashkent</button>
            <Link href="/manage">
              <button className={styles.filterButton}>
                <FiSliders size={18} />
              </button>
            </Link>
          </div>
          <div className={styles.locationInfo}>
            <a
              className={styles.infoLink}
              href="https://support.google.com/googlenews/answer/9256668?ref_topic=9006244&hl=en-GB&authuser=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiInfo size={18} />
              <span>Why these locations?</span>
            </a>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingCard count={3} />
      ) : (
        <div className={cls["article-container"]}>
          {isError ? (
            <p>Error loading articles</p>
          ) : articles.length === 0 ? (
            <p>No local news found</p>
          ) : (
            articles.map((article, idx) => (
              <Card key={idx} cardMain={article} smallCardOA />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default LocalNews;
