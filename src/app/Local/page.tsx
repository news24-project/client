"use client";

import type React from "react";
import { FiSliders, FiInfo } from "react-icons/fi";
import styles from "./Local.module.css";
import Link from "next/link";
import { customAxios } from "@/api/customAxios";
import Card from "@/components/card/Card";
import cls from "../country/[sulg]/Country.module.css";
import { useEffect, useState } from "react";

const BACKEND_URL = "https://news24.muhammad-yusuf.uz";

const LocalNews: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const formatArticle = (article: any) => ({
    ...article,
    iconUrl: article?.iconUrl ? `${BACKEND_URL}/${article.iconUrl}` : "",
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const { data } = await customAxios.get(`/article-tags/uz`);
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
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

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

      <div className={cls["article-container"]}>
        {loading ? (
          <p>Loading...</p>
        ) : articles.length === 0 ? (
          <p>No local news found</p>
        ) : (
          articles.map((article, idx) => <Card key={idx} cardMain={article} />)
        )}
      </div>
    </div>
  );
};

export default LocalNews;
