"use client";

import Card from "@/components/card/Card";
import { useGetAllArticles } from "@/hooks/useFollow";
import style from "./Foryou.module.css";

const ForYou = () => {
  const { data, isLoading } = useGetAllArticles("cmf52yob2039fw0twg6cjobbt");
  if (isLoading) return <div>not yet</div>;
  return (
    <div className="container">
      <div className={style.container}>
        <h1 style={{ display: "block" }}>For You</h1>
        <div
          style={{
            marginInline: "auto",
            background: "#1f1f1f",
            padding: "20px",
            borderRadius: "20px",
            marginTop: "30px",
          }}
        >
          {data
            .filter((e: any) => e.imageUrl)
            .map((e: any) => {
              if (e.source.language == "english") {
                return (
                  <Card
                    key={e.id}
                    cardMain={{
                      id: e.id,
                      title: e.title,
                      url: e.url,
                      author: e.author,
                      content: e.content,
                      imageUrl: e.imageUrl,
                      publishedAt: e.publishedAt,
                      summary: e.summary,
                      sourceId: "i don",
                      iconUrl: `http://localhost:4000/${e.source.iconUrl}`,
                      createdAt: "today",
                      type: e.source.type,
                      score: 1,
                    }}
                    smallCardOA
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default ForYou;
