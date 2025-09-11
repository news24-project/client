"use client";

import Card from "@/components/card/Card";
import { useGetAllArticles } from "@/hooks/useFollow";
import style from "./Foryou.module.css";
import LoadingCard from "@/components/LoadingCard";

const ForYou = () => {
  const { data = [], isLoading } = useGetAllArticles();
  const BACKEND_URL = "https://news24.muhammad-yusuf.uz";

  const formatArticle = (article: any) => ({
    ...article,
    iconUrl: article?.source?.iconUrl
      ? `${BACKEND_URL}/${article.source.iconUrl}`
      : "",
    sourceName: article?.source?.name || "",
    language: article?.source?.language || "",
  });

  return (
    <div className="container">
      <div className={style.container}>
        <h1 className={style.title}>For You</h1>

        {isLoading ? (
          <LoadingCard count={3} />
        ) : (
          <>
            <div className={style["article-container"]}>
              {data
                .filter(
                  (e: any) => e.imageUrl && e.source.language === "english"
                )
                .map((e: any, groupIdx: number) => {
                  const formatted = formatArticle(e);

                  return (
                    <Card
                      key={groupIdx}
                      cardMain={formatted}
                      smallCardOA
                      cards={data
                        .slice(groupIdx * 3, groupIdx * 3 + 3)
                        .map(formatArticle)}
                    />
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForYou;
