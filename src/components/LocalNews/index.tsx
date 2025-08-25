import React from "react";
import styles from "./Local.module.css";

interface NewsItemProps {
  source: string;
  sourceIcon: string;
  title: string;
  time: string;
  image: string;
}

const NewsItem: React.FC<NewsItemProps> = ({
  source,
  sourceIcon,
  title,
  time,
  image,
}) => {
  return (
    <article className={styles.newsItem}>
      <div className={styles.newsContent}>
        <div className={styles.newsText}>
          <div className={styles.sourceInfo}>
            <img
              src={sourceIcon}
              alt={`${source} icon`}
              className={styles.sourceIcon}
            />
            <span className={styles.sourceName}>{source}</span>
          </div>
          <h2 className={styles.newsTitle}>{title}</h2>
          <time className={styles.newsTime}>{time}</time>
        </div>
        <div className={styles.newsImage}>
          <img src={image} alt={title} />
        </div>
      </div>
    </article>
  );
};

export default NewsItem;
