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
  const today = new Date();
  const dayName = days[today.getDay()];
  const monthName = months[today.getMonth()];
  const dateNum = today.getDate();

  const [isActiveModal, setIsActiveModal] = React.useState(false);

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
