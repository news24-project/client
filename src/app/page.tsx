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

export const days = [
  {
    "en-US": "Sunday",
    "ru-RU": "Воскресенье",
    "uz-UZ": "Yakshanba",
    "kz-KZ": "Жексенбі",
    "in-IN": "रविवार",
    "tr-TR": "Pazar",
    "zh-TW": "星期日",
    "ky-KG": "Жекшемби",
  },
  {
    "en-US": "Monday",
    "ru-RU": "Понедельник",
    "uz-UZ": "Dushanba",
    "kz-KZ": "Дүйсенбі",
    "in-IN": "सोमवार",
    "tr-TR": "Pazartesi",
    "zh-TW": "星期一",
    "ky-KG": "Дүйшөмбү",
  },
  {
    "en-US": "Tuesday",
    "ru-RU": "Вторник",
    "uz-UZ": "Seshanba",
    "kz-KZ": "Сейсенбі",
    "in-IN": "मंगलवार",
    "tr-TR": "Salı",
    "zh-TW": "星期二",
    "ky-KG": "Шейшемби",
  },
  {
    "en-US": "Wednesday",
    "ru-RU": "Среда",
    "uz-UZ": "Chorshanba",
    "kz-KZ": "Сәрсенбі",
    "in-IN": "बुधवार",
    "tr-TR": "Çarşamba",
    "zh-TW": "星期三",
    "ky-KG": "Шаршемби",
  },
  {
    "en-US": "Thursday",
    "ru-RU": "Четверг",
    "uz-UZ": "Payshanba",
    "kz-KZ": "Бейсенбі",
    "in-IN": "गुरुवार",
    "tr-TR": "Perşembe",
    "zh-TW": "星期四",
    "ky-KG": "Бейшемби",
  },
  {
    "en-US": "Friday",
    "ru-RU": "Пятница",
    "uz-UZ": "Juma",
    "kz-KZ": "Жұма",
    "in-IN": "शुक्रवार",
    "tr-TR": "Cuma",
    "zh-TW": "星期五",
    "ky-KG": "Жума",
  },
  {
    "en-US": "Saturday",
    "ru-RU": "Суббота",
    "uz-UZ": "Shanba",
    "kz-KZ": "Сенбі",
    "in-IN": "शनिवार",
    "tr-TR": "Cumartesi",
    "zh-TW": "星期六",
    "ky-KG": "Ишемби",
  },
];

export const months = [
  {
    "en-US": "January",
    "ru-RU": "Январь",
    "uz-UZ": "Yanvar",
    "kz-KZ": "Қаңтар",
    "in-IN": "जनवरी",
    "tr-TR": "Ocak",
    "zh-TW": "一月",
    "ky-KG": "Январь",
  },
  {
    "en-US": "February",
    "ru-RU": "Февраль",
    "uz-UZ": "Fevral",
    "kz-KZ": "Ақпан",
    "in-IN": "फ़रवरी",
    "tr-TR": "Şubat",
    "zh-TW": "二月",
    "ky-KG": "Февраль",
  },
  {
    "en-US": "March",
    "ru-RU": "Март",
    "uz-UZ": "Mart",
    "kz-KZ": "Наурыз",
    "in-IN": "मार्च",
    "tr-TR": "Mart",
    "zh-TW": "三月",
    "ky-KG": "Март",
  },
  {
    "en-US": "April",
    "ru-RU": "Апрель",
    "uz-UZ": "Aprel",
    "kz-KZ": "Сәуір",
    "in-IN": "अप्रैल",
    "tr-TR": "Nisan",
    "zh-TW": "四月",
    "ky-KG": "Апрель",
  },
  {
    "en-US": "May",
    "ru-RU": "Май",
    "uz-UZ": "May",
    "kz-KZ": "Мамыр",
    "in-IN": "मई",
    "tr-TR": "Mayıs",
    "zh-TW": "五月",
    "ky-KG": "Май",
  },
  {
    "en-US": "June",
    "ru-RU": "Июнь",
    "uz-UZ": "Iyun",
    "kz-KZ": "Маусым",
    "in-IN": "जून",
    "tr-TR": "Haziran",
    "zh-TW": "六月",
    "ky-KG": "Июнь",
  },
  {
    "en-US": "July",
    "ru-RU": "Июль",
    "uz-UZ": "Iyul",
    "kz-KZ": "Шілде",
    "in-IN": "जुलाई",
    "tr-TR": "Temmuz",
    "zh-TW": "七月",
    "ky-KG": "Июль",
  },
  {
    "en-US": "August",
    "ru-RU": "Август",
    "uz-UZ": "Avgust",
    "kz-KZ": "Тамыз",
    "in-IN": "अगस्त",
    "tr-TR": "Ağustos",
    "zh-TW": "八月",
    "ky-KG": "Август",
  },
  {
    "en-US": "September",
    "ru-RU": "Сентябрь",
    "uz-UZ": "Sentyabr",
    "kz-KZ": "Қыркүйек",
    "in-IN": "सितंबर",
    "tr-TR": "Eylül",
    "zh-TW": "九月",
    "ky-KG": "Сентябрь",
  },
  {
    "en-US": "October",
    "ru-RU": "Октябрь",
    "uz-UZ": "Oktyabr",
    "kz-KZ": "Қазан",
    "in-IN": "अक्टूबर",
    "tr-TR": "Ekim",
    "zh-TW": "十月",
    "ky-KG": "Октябрь",
  },
  {
    "en-US": "November",
    "ru-RU": "Ноябрь",
    "uz-UZ": "Noyabr",
    "kz-KZ": "Қараша",
    "in-IN": "नवंबर",
    "tr-TR": "Kasım",
    "zh-TW": "十一月",
    "ky-KG": "Ноябрь",
  },
  {
    "en-US": "December",
    "ru-RU": "Декабрь",
    "uz-UZ": "Dekabr",
    "kz-KZ": "Желтоқсан",
    "in-IN": "दिसंबर",
    "tr-TR": "Aralık",
    "zh-TW": "十二月",
    "ky-KG": "Декабрь",
  },
];

export const briefing = {
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
  article: IArticle; // asl maqola shu yerda
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
    iconUrl: article?.iconUrl ? `${BACKEND_URL}/${article.iconUrl}` : "",
  });

  const cards = articles
    .flatMap(
      (article) =>
        article.articleTags?.map((tag) =>
          tag?.article ? formatArticle(tag.article) : null
        ) || []
    )
    .filter(Boolean);

  const latestTen = [...cards]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 10);

  const fetchUserTopics = async () => {
    try {
      const { data } = await customAxios.get("/user/topics");
      console.log("User topics:", data);

      const tags: Tag[] = Array.isArray(data)
        ? data.map((item: any) => ({
            id: item.id,
            name: item.name,
            articles: item.articles
              ? item.articles.map((a: any) => formatArticle(a))
              : [],
          }))
        : [];

      setUserTopics(tags);
    } catch (err) {
      console.error("Error fetching user topics:", err);
    }
  };

  useEffect(() => {
    fetchUserTopics();
  }, []);
  console.log(articles ,"sdckascvkghsvdgcvashcvsdghk")

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
      <div style={{ width: "70%" }}>
        {articles?.length > 0 && (
          <>
            <Card cardMain={articles[0]?.articleTags[0]} smallCardOA={true} />
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
                      <div className={cls.topicCardsGrid}>
                        {tag.articles && tag.articles.length > 0 ? (
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
                      </div>
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

            {articles?.length > 1 && (
              <Card
                cardMain={articles[1].articleTags[0]}
                cards={cards.slice(2)}
              />
            )}
          </>
        )}
      </div>

      <ModalShare />
    </div>
  );
};

export default Home;
