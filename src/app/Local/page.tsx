

"use client";

import type React from "react"
import { FiSliders, FiInfo } from "react-icons/fi"
import styles from "./Local.module.css"
import Link from "next/link"
import NewsItem from "../../components/LocalNews"

const LocalNews: React.FC = () => {
  const news = [
    {
      id: 1,
      source: "Euronews.com",
      sourceIcon: "https://www.euronews.com/favicon.ico",
      title: "New Tashkent: Uzbekistan's Urban Transformation",
      time: "20 hours ago",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      source: "FIVB",
      sourceIcon: "https://www.fivb.com/favicon.ico",
      title: "Spotlight turns to Tashkent as Boys' U19 World Championship begins Thursday",
      time: "23 Jul",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      source: "The Gymternet",
      sourceIcon: "https://picsum.photos/200/300",
      title: "2025 Tashkent Challenge Cup Results",
      time: "22 Jun",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 4,
      source: "UzDaily",
      sourceIcon: "https://www.uzdaily.uz/favicon.ico",
      title: "Tashkent to host international conference on digital economy",
      time: "15 Jul",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 5,
      source: "BBC News",
      sourceIcon: "https://www.bbc.com/favicon.ico",
      title: "Tashkent's role in Central Asia's geopolitics",
      time: "10 Jul",
      image: "https://picsum.photos/200/300",

    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Your local news</h1>

        <div className={styles.controls}>
          <div className={styles.leftControls}>
            <button className={styles.locationButton}>Tashkent</button>
            <Link href="/manage">
              <button
                className={styles.filterButton}

              >
                <FiSliders size={18} />
              </button>
            </Link>
          </div>
          <div className={styles.locationInfo}>
            <a className={styles.infoLink} href="https://support.google.com/googlenews/answer/9256668?ref_topic=9006244&hl=en-GB&authuser=0" target="_blank" rel="noopener noreferrer">
              <FiInfo size={18} />
              <span>Why these locations?</span>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.newsList}>
        {news.map((item) => (

          <NewsItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}



export default LocalNews
