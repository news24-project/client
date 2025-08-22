
import WeatherCard from "@/components/WeatherCard";
import styles from "./page.module.css";

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
  const monthName = months[today.getMonth()];
  const dayOfWeek = days[today.getDay()];
  const day = today.getDate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.calendar_whether}>
        <div>
          <h1 style={{ fontWeight: "400" }}>Your briefing</h1>
          <br />
          <p className={styles.weak}>
            {dayOfWeek}, {monthName} {day}
          </p>
        </div>
        <WeatherCard />
      </div>
    </div>
  );

};

export default Home;
