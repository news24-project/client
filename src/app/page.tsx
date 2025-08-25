"use client";


import WeatherCard from "@/components/WeatherCard";
import styles from "./page.module.css";
import { ICard } from "@/components/card/interfaces";
import Card from "@/components/card/Card";
import ModalShare from "@/components/modalShare";
import React from "react";

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

import React from "react";

const Home = () => {
  const today = new Date();
  const dayName = days[today.getDay()];
  const monthName = months[today.getMonth()];
  const dateNum = today.getDate();

  const formattedDate = `${dayName}, ${monthName} ${dateNum}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.calendar_weather}>
        <div>
          <h1 style={{ fontWeight: "300" }}>Your briefing</h1>
          <p className={styles.weak}>{formattedDate}</p>{" "}
        </div>
        <WeatherCard />
      </div>
    </div>
  );
};

export default Home;
