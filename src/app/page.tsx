import WeatherCard from "@/components/WeatherCard";
import styles from "./page.module.css";
import SunClouds from "../../public/icons/sun_clouds";

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
import LocalNews from "./Local";

const Home = () => {
  return (
    <div className="container">
      <h1>Home</h1>
    </div>
  );
};

export default Home;
