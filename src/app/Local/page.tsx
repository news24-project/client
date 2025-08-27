import { FiSliders, FiInfo } from "react-icons/fi"
import styles from "./Local.module.css"
import Link from "next/link"

const Local= () => {
  const news = [
    {
      id: 1,
      source: "FIVB",
      sourceIcon: "https://picsum.photos/seed/fivb/40/40",
      title: "Spotlight turns to Tashkent as Boys' U19 World Championship begins Thursday",
      time: "23 Jul",
      image: "https://picsum.photos/seed/volleyball/200/120",
    },
    {
      id: 2,
      source: "The Guardian",
      sourceIcon: "https://picsum.photos/seed/guardian/40/40",
      title: "Cosmic metros, UFO circus tops and a 3000C sun gun: the mesmerising architecture of Tashkent",
      time: "28 Apr • By Oliver Wainwright",
      image: "https://picsum.photos/seed/architecture/200/120",
    },
    {
      id: 3,
      source: "ch-aviation",
      sourceIcon: "https://picsum.photos/seed/aviation/40/40",
      title: "Uzbekistan's Tashkent Air launches scheduled passenger ops",
      time: "5 Jun",
      image: "https://picsum.photos/seed/airplane/200/120",
    },
    {
      id: 4,
      source: "The Stadium Business",
      sourceIcon: "https://picsum.photos/seed/stadium/40/40",
      title: "Tashkent stadium development project announced",
      time: "12 May",
      image: "https://picsum.photos/seed/sports/200/120",
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
                onClick={() => setTimeout(() => {}, 3000)}
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
          <div key={item.id} className={styles.newsItem}>
            <div className={styles.newsContent}>
              <div className={styles.newsText}>
                <div className={styles.sourceInfo}>
                  <img src={item.sourceIcon || "/placeholder.svg"} alt={item.source} className={styles.sourceIcon} />
                  <span className={styles.sourceName}>{item.source}</span>
                </div>
                <h2 className={styles.newsTitle}>{item.title}</h2>
                <div className={styles.newsTime}>{item.time}</div>
              </div>
              <div className={styles.newsImage}>
                <img src={item.image || "/placeholder.svg"} alt={item.title} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Local
