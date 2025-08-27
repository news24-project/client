"use client";

import WeatherCard from "@/components/WeatherCard";
import styles from "./page.module.css";
import { ICard } from "@/components/card/interfaces";
import Card from "@/components/card/Card";
import ModalShare from "@/components/modalShare";
import React from "react";
import { useLanguage } from "./LanguageProvider";

export const days = [
  {
    "en-US": "Sunday",
    "ru-RU": "Воскресенье",
    "uz-UZ": "Yakshanba",
    "kz-KZ": "Жексенбі",
    "in-IN": "रविवार", // Hindi
    "tr-TR": "Pazar",
    "zh-TW": "星期日",
  },
  {
    "en-US": "Monday",
    "ru-RU": "Понедельник",
    "uz-UZ": "Dushanba",
    "kz-KZ": "Дүйсенбі",
    "in-IN": "सोमवार",
    "tr-TR": "Pazartesi",
    "zh-TW": "星期一",
  },
  {
    "en-US": "Tuesday",
    "ru-RU": "Вторник",
    "uz-UZ": "Seshanba",
    "kz-KZ": "Сейсенбі",
    "in-IN": "मंगलवार",
    "tr-TR": "Salı",
    "zh-TW": "星期二",
  },
  {
    "en-US": "Wednesday",
    "ru-RU": "Среда",
    "uz-UZ": "Chorshanba",
    "kz-KZ": "Сәрсенбі",
    "in-IN": "बुधवार",
    "tr-TR": "Çarşamba",
    "zh-TW": "星期三",
  },
  {
    "en-US": "Thursday",
    "ru-RU": "Четверг",
    "uz-UZ": "Payshanba",
    "kz-KZ": "Бейсенбі",
    "in-IN": "गुरुवार",
    "tr-TR": "Perşembe",
    "zh-TW": "星期四",
  },
  {
    "en-US": "Friday",
    "ru-RU": "Пятница",
    "uz-UZ": "Juma",
    "kz-KZ": "Жұма",
    "in-IN": "शुक्रवार",
    "tr-TR": "Cuma",
    "zh-TW": "星期五",
  },
  {
    "en-US": "Saturday",
    "ru-RU": "Суббота",
    "uz-UZ": "Shanba",
    "kz-KZ": "Сенбі",
    "in-IN": "शनिवार",
    "tr-TR": "Cumartesi",
    "zh-TW": "星期六",
  },
];
const months = [
  {
    "en-US": "January",
    "ru-RU": "Январь",
    "uz-UZ": "Yanvar",
    "kz-KZ": "Қаңтар",
    "in-IN": "जनवरी",
    "tr-TR": "Ocak",
    "zh-TW": "一月",
  },
  {
    "en-US": "February",
    "ru-RU": "Февраль",
    "uz-UZ": "Fevral",
    "kz-KZ": "Ақпан",
    "in-IN": "फ़रवरी",
    "tr-TR": "Şubat",
    "zh-TW": "二月",
  },
  {
    "en-US": "March",
    "ru-RU": "Март",
    "uz-UZ": "Mart",
    "kz-KZ": "Наурыз",
    "in-IN": "मार्च",
    "tr-TR": "Mart",
    "zh-TW": "三月",
  },
  {
    "en-US": "April",
    "ru-RU": "Апрель",
    "uz-UZ": "Aprel",
    "kz-KZ": "Сәуір",
    "in-IN": "अप्रैल",
    "tr-TR": "Nisan",
    "zh-TW": "四月",
  },
  {
    "en-US": "May",
    "ru-RU": "Май",
    "uz-UZ": "May",
    "kz-KZ": "Мамыр",
    "in-IN": "मई",
    "tr-TR": "Mayıs",
    "zh-TW": "五月",
  },
  {
    "en-US": "June",
    "ru-RU": "Июнь",
    "uz-UZ": "Iyun",
    "kz-KZ": "Маусым",
    "in-IN": "जून",
    "tr-TR": "Haziran",
    "zh-TW": "六月",
  },
  {
    "en-US": "July",
    "ru-RU": "Июль",
    "uz-UZ": "Iyul",
    "kz-KZ": "Шілде",
    "in-IN": "जुलाई",
    "tr-TR": "Temmuz",
    "zh-TW": "七月",
  },
  {
    "en-US": "August",
    "ru-RU": "Август",
    "uz-UZ": "Avgust",
    "kz-KZ": "Тамыз",
    "in-IN": "अगस्त",
    "tr-TR": "Ağustos",
    "zh-TW": "八月",
  },
  {
    "en-US": "September",
    "ru-RU": "Сентябрь",
    "uz-UZ": "Sentyabr",
    "kz-KZ": "Қыркүйек",
    "in-IN": "सितंबर",
    "tr-TR": "Eylül",
    "zh-TW": "九月",
  },
  {
    "en-US": "October",
    "ru-RU": "Октябрь",
    "uz-UZ": "Oktyabr",
    "kz-KZ": "Қазан",
    "in-IN": "अक्टूबर",
    "tr-TR": "Ekim",
    "zh-TW": "十月",
  },
  {
    "en-US": "November",
    "ru-RU": "Ноябрь",
    "uz-UZ": "Noyabr",
    "kz-KZ": "Қараша",
    "in-IN": "नवंबर",
    "tr-TR": "Kasım",
    "zh-TW": "十一月",
  },
  {
    "en-US": "December",
    "ru-RU": "Декабрь",
    "uz-UZ": "Dekabr",
    "kz-KZ": "Желтоқсан",
    "in-IN": "दिसंबर",
    "tr-TR": "Aralık",
    "zh-TW": "十二月",
  },
];

const briefing = {
  "en-US": "Your briefing",
  "ru-RU": "Ваше резюме",
  "uz-UZ": "Sizning qisqacha ma’lumotingiz",
  "kz-KZ": "Сіздің қысқаша мәліметіңіз",
  "in-IN": "आपकी सारांश सूचना",
  "tr-TR": "Sizin brifinginiz",
  "zh-TW": "您的簡報",
};

const cardMain: ICard["cardMain"] = {
  img: "https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE.jpg",
  cardMainDiv: {
    imgIcon:
      "https://play-lh.googleusercontent.com/0IoGNBJeaga47hJgxtTzXXlPQmZYGjrzghS1NLoCrtjJTkm_GSRs5e44FmrXxxCUYJs",
    imgIconText: "BBC",
    title: "Protests expected at asylum hotels across UK as tensions mount",
    dateText: "1 hour ago",
    author: {
      name: "By Jamie Grierson",
      id: "https://news.google.com/topics/CAAqKAgKIiJDQkFTRXdvTkwyY3ZNVEZ3Tmpjd1ltUnFkeElDWlc0b0FBUAE?hl=en-GB&gl=GB&ceid=GB%3Aen",
    },
    organization: {
      id: "https://news.google.com/publications/CAAqIAgKIhpDQklTRFFnTWFna0tCMkppWXk1amIyMG9BQVAB?hl=en-GB&gl=GB&ceid=GB%3Aen",
      title: "BBC",
    },
    socials: {
      facebookLink:
        "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.bbc.com%2Fnews%2Flive%2Fce83n80dqllt",
      link: "https://www.bbc.com/news/live/ce83n80dqllt",
      twitterLink:
        "https://x.com/intent/post?text=Number%20of%20asylum%20seekers%20in%20hotels%20up%208%25%20in%20past%20year%2C%20but%20falls%20slightly%20since%20March%2C%20new%20data%20shows%20-%20BBC&url=https%3A%2F%2Fwww.bbc.com%2Fnews%2Flive%2Fce83n80dqllt&via=GoogleNews",
    },
  },
};

const cards: ICard["cards"] = [
  { cardMainDiv: cardMain.cardMainDiv },
  { cardMainDiv: cardMain.cardMainDiv },
  { cardMainDiv: cardMain.cardMainDiv },
];

const Home = () => {
  const { selectedLang } = useLanguage();
  const today = new Date();
  const dayName = days[today.getDay()][selectedLang];
  const monthName = months[today.getMonth()][selectedLang];
  const dateNum = today.getDate();

  const [isActiveModal, setIsActiveModal] = React.useState(false);

  const formattedDate = `${dayName}, ${monthName} ${dateNum}`;

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
          <p className={styles.weak}>{formattedDate}</p>{" "}
        </div>
        <WeatherCard />
      </div>

      <Card
        cardMain={cardMain}
        smallCardOA={true}
        setIsActiveModal={setIsActiveModal}
      />
      <Card
        cardMain={cardMain}
        cards={cards}
        setIsActiveModal={setIsActiveModal}
      />

      {isActiveModal && (
        <ModalShare
          isActiveModal={isActiveModal}
          setIsActiveModal={setIsActiveModal}
        />
      )}
    </div>
  );
};

export default Home;
