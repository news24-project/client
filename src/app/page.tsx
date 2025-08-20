import WhetherCard from "@/components/WeatherCard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.calendar_whether}>
        <div>
          <h1>Your briefing</h1>
          <br />
          <p>Tuesday, August 19</p>
        </div>
        <WhetherCard />
      </div>
    </div>
  );
}
