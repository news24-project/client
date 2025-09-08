"use client";

import WeatherCard from "@/components/WeatherCard";
import cls from "./page.module.css";
import Card from "@/components/card/Card";
import ModalShare from "@/components/modalShare";
import React, { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { useFindAllArticles } from "@/hooks/useArticles";
import { IoIosArrowForward, IoMdOptions } from "react-icons/io";
import { FaRegCircleQuestion } from "react-icons/fa6";
import CategoryModal from "@/components/CategoryModal/CategoryModal";
import { IArticle } from "@/api";
import { customAxios } from "@/api/customAxios";
import { days, months } from "@/utils/dates";

const briefing = {
  "en-US": "Your briefing",
  "ru-RU": "Ваше резюме",
  "uz-UZ": "Sizning qisqacha ma’lumotingiz",
  "kz-KZ": "Сіздің қысқаша мәліметіңіз",
  "in-IN": "आपकी सारांश सूचना",
  "tr-TR": "Sizin brifinginiz",
  "zh-TW": "您的簡報",
  "ky-KG": "Сиздин кыскача маалымат",
};
interface Tag {
  id: string;
  name: string;
  articles?: IArticleChild[];
}
interface IArticleChild {
  id: string;
  article: IArticle;
}

const BACKEND_URL = "http://localhost:4000";

const Home: React.FC = () => {
  const { selectedLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [userTopics, setUserTopics] = useState<Tag[]>([]);
  const today = new Date();
  const dayName = days[today.getDay()][selectedLang as keyof (typeof days)[0]];
  const monthName =
    months[today.getMonth()][selectedLang as keyof (typeof months)[0]];
  const dateNum = today.getDate();
  const formattedDate = `${dayName}, ${monthName} ${dateNum}`;

  const { data: articles = [] } = useFindAllArticles();

  const formatArticle = (article: any) => ({
    ...article,
    id: article.id || article.articleId,
    title: article.title || article.article?.title,
    url: article.url || article.article?.url,
    summary: article.summary || article.article?.summary,
    content: article.content || article.article?.content,
    imageUrl: article.imageUrl || article.article?.imageUrl,

    author: article.author || article.article?.author,
    publishedAt: article.publishedAt || article.article?.publishedAt,
    type: article.type || article.article?.type,
    score: article.score || article.article?.score,
    createdAt: article.createdAt || article.article?.createdAt,
    sourceId: article.sourceId || article.article?.sourceId,
    iconUrl: article.iconUrl
      ? `${BACKEND_URL}/${article.iconUrl}`
      : article.article?.iconUrl
      ? `${BACKEND_URL}/${article.article.iconUrl}`
      : "",
  });

  const cards = articles
    .flatMap(
      (article) =>
        article.articleTags?.map((tag) => (tag ? formatArticle(tag) : null)) ||
        []
    )
    .filter(Boolean);

  const latestTen = [...cards]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 10);

  console.log(latestTen[0]);

  const fetchUserTopics = async () => {
    try {
      const { data } = await customAxios.get("/user/topics");
      console.log("User topics raw:", data);

      const tags: Tag[] = Array.isArray(data)
        ? data.map((item: any) => ({
            id: item.id,
            name: item.name,
            articles: item.articles
              ? item.articles.map((a: any) => formatArticle(a))
              : [],
          }))
        : [];

      console.log("User topics formatted:", tags);
      setUserTopics(tags);
    } catch (err) {
      console.error("Error fetching user topics:", err);
    }
  };

  useEffect(() => {
    fetchUserTopics();
  }, []);
  console.log(articles, "sdckascvkghsvdgcvashcvsdghk");

  return (
    <div className={cls.wrapper}>
      <div className={cls.calendar_weather}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div style={{ fontWeight: "300", fontSize: "28px" }}>
            {briefing[selectedLang]}
          </div>
          <p className={cls.weak}>{formattedDate}</p>
        </div>
        <WeatherCard />
      </div>

      <div>
        {articles?.length > 0 && (
          <>
            <div className={cls["home-content"]}>
              {latestTen.length >= 4 && (
                <div className={cls["home"]}>
                  <div className={cls["title"]}>
                    Top stories <IoIosArrowForward />
                  </div>
                  <hr className={cls.hr} />
                  <div className={cls["home-container"]}>
                    <Card
                      cardMain={latestTen[0]}
                      cards={latestTen.slice(1, 4)}
                    />
                    <Card
                      cardMain={latestTen[1]}
                      cards={latestTen.slice(4, 7)}
                    />
                    <Card cardMain={latestTen[2]} smallCardOA />
                    <Card cardMain={latestTen[3]} smallCardOA />
                  </div>
                </div>
              )}
              {cards.length >= 3 && (
                <div className={cls["home2"]}>
                  <div className={cls["title-pick"]}>
                    Picks for you <FaRegCircleQuestion color="white" />
                  </div>
                  <hr className={cls.hr} />
                  <div className={cls["home-container2"]}>
                    {cards.slice(0, 3).map((article, idx) => (
                      <Card
                        key={article.id || idx}
                        cardMain={article}
                        smallCardOA
                        isSmallImgCard
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className={cls["for-title"]}>
                For you <IoIosArrowForward />
              </div>
              <div className={cls["for-in"]}>
                Recommended based on your interests
                <span>
                  <FaRegCircleQuestion />
                </span>
              </div>
            </div>
            <div>
              <div className={cls["topic"]}>
                <div className={cls["for-title"]}>Your topics</div>
                <button
                  onClick={() => setIsOpen(true)}
                  className={cls["customize-btn"]}
                >
                  <IoMdOptions /> Customize
                </button>
              </div>
              <div className={cls["topic-list"]}>
                {userTopics.map((tag) => (
                  <div key={tag.id} className={cls.topicWrapper}>
                    <div className={cls.topicCards}>
                      <h2 className={cls.topicTitle}>
                        {tag.name} <IoIosArrowForward />
                      </h2>
                      {/* <div className={cls.topicCardsGrid}>
                        {tag.articles && tag.articles?.length > 0 ? (
                          tag.articles
                            .slice(0, 3)
                            .map((article, idx) => (
                              <Card
                                key={article.id || idx}
                                cardMain={article}
                                smallCardOA
                              />
                            ))
                        ) : (
                          <p>No articles for this topic</p>
                        )}
                      </div> */}
                    </div>
                  </div>
                ))}

                <CategoryModal
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  onSave={() => fetchUserTopics()}
                />
              </div>
            </div>
            <div>
              <div className={cls["for-title"]}>Beyond the front page</div>
              <div className={cls["for-in"]}>
                Notable stories and conversation starters
              </div>
              <div className={cls.beyondContent}>
                {latestTen.slice(4, 8).map((article, idx) => (
                  <Card
                    key={article.id || idx}
                    cardMain={article}
                    smallCardOA
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <ModalShare />
    </div>
  );
};

export default Home;
