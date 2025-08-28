"use client";

import WeatherCard from "@/components/WeatherCard";
import styles from "./page.module.css";
import Card from "@/components/card/Card";
import ModalShare from "@/components/modalShare";
import React from "react";
import { useFindAllArticles } from "@/hooks/useArticles";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Home = () => {
  const today = new Date();
  const dayName = days[today.getDay()];
  const monthName = months[today.getMonth()];
  const dateNum = today.getDate();
  const formattedDate = `${dayName}, ${monthName} ${dateNum}`;

  const { data: articles = [], isLoading, isError } = useFindAllArticles();

  const cards = articles.flatMap((article) =>
    article.articleTags.map((tag) => tag.article)
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.calendar_weather}>
        <div>
          <h1 style={{ fontWeight: "300" }}>Your briefing</h1>
          <p className={styles.weak}>{formattedDate}</p>
        </div>
        <WeatherCard />
      </div>

      {articles?.length > 0 && (
        <>
          <Card
            cardMain={articles[0].articleTags[0].article}
            smallCardOA={true}
          />

          {articles?.length > 1 && (
            <Card cardMain={articles[1].articleTags[0].article} cards={cards.slice(2)} />
          )}
        </>
      )}

      <ModalShare />
    </div>
  );
};

export default Home;
