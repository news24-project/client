import type React from "react"
import { FiSliders, FiInfo } from "react-icons/fi"
import styles from "./Local.module.css"
import Link from "next/link"
const LocalNews: React.FC = () => {
  const news = [
    {
      id: 1,
      source: "Euronews.com",
      sourceIcon: "https://www.euronews.com/favicon.ico",
      title: "New Tashkent: Uzbekistan's Urban Transformation",
      time: "20 hours ago",
      image:
      "https://picsum.photos/200/300"
    },
    {
      id: 2,
      source: "FIVB",
      sourceIcon: "https://www.fivb.com/favicon.ico",
      title: "Spotlight turns to Tashkent as Boys' U19 World Championship begins Thursday",
      time: "23 Jul",
      image: "https://picsum.photos/200/300"
    },
    {
      id: 3,
      source: "The Gymternet",
      sourceIcon: "https://picsum.photos/200/300",
      title: "2025 Tashkent Challenge Cup Results",
      time: "22 Jun",
      image: "https://picsum.photos/200/300"
    },
    {
      id: 4,
      source: "UzDaily",
      sourceIcon: "https://www.uzdaily.uz/favicon.ico",
      title: "Tashkent to host international conference on digital economy",
      time: "15 Jul",
      image: "https://picsum.photos/200/300"
    },
    {
      id: 5,
      source: "BBC News",
      sourceIcon: "https://www.bbc.com/favicon.ico",
      title: "Tashkent's role in Central Asia's geopolitics",
      time: "10 Jul",
      image: "https://picsum.photos/200/300"
    }
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
                onClick={(e) => {
                  e.preventDefault();
                  setTimeout(() => {
                    window.location.href = "/manage";
                  }, 500);
                }}
              >
                <FiSliders size={18} />
              </button>
            </Link>
          </div>
          <div className={styles.locationInfo}>
            <FiInfo size={14} />
            <span>Why these locations?</span>
          </div>
        </div>
      </div>

      <div className={styles.newsList}>
        {news.map((item) => (
          <article key={item.id} className={styles.newsItem}>
            <div className={styles.newsContent}>
              <div className={styles.newsText}>
                <div className={styles.sourceInfo}>
                  <img
                    src={item.sourceIcon || "/placeholder.svg?height=16&width=16"}
                    alt={`${item.source} icon`}
                    className={styles.sourceIcon}
                  />
                  <span className={styles.sourceName}>{item.source}</span>
                </div>

                <h2 className={styles.newsTitle}>{item.title}</h2>

                <time className={styles.newsTime}>{item.time}</time>
              </div>

              <div className={styles.newsImage}>
                <img src={item.image || "/placeholder.svg"} alt={item.title} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default LocalNews
