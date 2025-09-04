"use client";

import WeatherCard from "@/components/WeatherCard";
import styles from "./page.module.css";
import Card from "@/components/card/Card";
import ModalShare from "@/components/modalShare";
import React from "react";
import { useLanguage } from "./LanguageProvider";
import { useFindAllArticles } from "@/hooks/useArticles";
import { ICard } from "@/components/card/interfaces";

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

const Home: React.FC = () => {
  const { selectedLang } = useLanguage();
  const today = new Date();
  const dayName = days[today.getDay()][selectedLang as keyof (typeof days)[0]];
  const monthName =
    months[today.getMonth()][selectedLang as keyof (typeof months)[0]];
  const dateNum = today.getDate();
  const formattedDate = `${dayName}, ${monthName} ${dateNum}`;

  const { data: articles = [], isLoading, isError } = useFindAllArticles();

  const cards = articles.flatMap((article) =>
    article.articleTags.map((tag) => tag)
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.calendar_weather}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <h1 style={{ fontWeight: "300" }}>{briefing[selectedLang]}</h1>
          <p className={styles.weak}>{formattedDate}</p>
        </div>
        <WeatherCard />
      </div>
      {/* Expreriment Div */}
      <div style={{width:"70%"}}>
        {articles?.length > 0 && (
          <>
            <Card cardMain={articles[0].articleTags[0]} smallCardOA={true} />

            {articles?.length > 1 && (
              <Card
                cardMain={articles[1].articleTags[0]}
                cards={cards.slice(2)}
              />
            )}
          </>
        )}
      </div>
      {/* Expreriment Div */}

      <ModalShare />
    </div>
  );
};

export default Home;
