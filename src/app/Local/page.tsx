"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { FiSliders, FiInfo } from "react-icons/fi";
import styles from "./Local.module.css";
import Link from "next/link";
import Card from "@/components/card/Card";
import { customAxios } from "@/api/customAxios";

const BACKEND_URL = "http://localhost:4000";

const LocalNews: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUzNews = async () => {
      try {
        const { data } = await customAxios.get("/article-tags/uz");

        // Backend URL qo‘shish, imageUrl mavjud bo‘lmaganlarni tashlab ketish va sort qilish
        const formattedArticles = data.data
          .map((item: any) => ({
            ...item,
            iconUrl: item.iconUrl ? `${BACKEND_URL}/${item.iconUrl}` : "",
          }))
          .filter((item: any) => item.imageUrl) // imageUrl bo‘lmaganlarni tashlaymiz
          .sort(
            (a: any, b: any) =>
              new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          );

        setArticles(formattedArticles);
      } catch (error) {
        console.error("O‘zbekiston yangiliklarini olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUzNews();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Uzbekistan News</div>
        <div className={styles.locationInfo}>
          <FiInfo size={14} />
          <Link
            className={styles["link"]}
            href={
              "https://support.google.com/googlenews/answer/9256668?ref_topic=9006244&hl=en&authuser=0"
            }
          >
            Why these locations?
          </Link>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.leftControls}>
          <button className={styles.locationButton}>Tashkent</button>
          <Link href="/manage">
            <button className={styles.filterButton}>
              <FiSliders size={18} />
            </button>
          </Link>
        </div>
      </div>

      <div className={styles["article-container"]}>
        {articles.map((article, idx) => (
          <Card key={article.id || idx} cardMain={article} smallCardOA />
        ))}
      </div>
    </div>
  );
};

export default LocalNews;
