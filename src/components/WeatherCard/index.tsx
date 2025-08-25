"use client";

import { useState } from "react";
import LeftSwiper from "../../../public/icons/left_swiper";
import SunIcon from "../../../public/icons/sun";
import TargetIcon from "../../../public/icons/target";
import cls from "./whether.module.css";
import { useGetWeather } from "@/hooks/useGetWeather";
import SunClouds from "../../../public/icons/sun_clouds";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WeatherCard = () => {
  const [show, setShow] = useState(false);
  const [bigAnimate, setBigAnimate] = useState(false);
  const [bigCooldown, setBigCooldown] = useState(false);

  const [location, setLocation] = useState<string>("Tashkent");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const today = new Date();

  const { data, error, isLoading } = useGetWeather("Tashkent");
  const [smallAnimate, setSmallAnimate] = useState<Record<number, boolean>>({});
  const [smallCooldown, setSmallCooldown] = useState<Record<number, boolean>>(
    {}
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleBigHover = () => {
    if (bigCooldown) return;
    setBigAnimate(true);
    setBigCooldown(true);

    setTimeout(() => setBigAnimate(false), 1000);
    setTimeout(() => setBigCooldown(false), 3000);
  };

  const handleSmallHover = (i: number) => {
    if (smallCooldown[i]) return;

    setSmallAnimate((prev) => ({ ...prev, [i]: true }));
    setSmallCooldown((prev) => ({ ...prev, [i]: true }));

    setTimeout(
      () => setSmallAnimate((prev) => ({ ...prev, [i]: false })),
      1000
    );
    setTimeout(
      () => setSmallCooldown((prev) => ({ ...prev, [i]: false })),
      3000
    );
  };
  const forecast = [
    {
      day: "Today",
      high: Math.floor(data.list[0].main.temp),
      low: Math.floor(data.list[0].main.temp_min),
      weather: data.list[0].weather[0].main,
    },
    {
      day: "Tomorrow",
      high: Math.floor(data.list[8].main.temp),
      low: Math.floor(data.list[8].main.temp_min),
      weather: data.list[8].weather[0].main,
    },
    {
      day: days[(today.getDay() + 2) % 7].slice(0, 3),
      high: Math.floor(data.list[17].main.temp),
      low: Math.floor(data.list[17].main.temp_min),
      weather: data.list[17].weather[0].main,
    },
    {
      day: days[(today.getDay() + 3) % 7].slice(0, 3),
      high: Math.floor(data.list[25].main.temp),
      low: Math.floor(data.list[25].main.temp_min),
      weather: data.list[25].weather[0].main,
    },
  ];
  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setCoords({ lat, lon });

          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.city || data.locality) {
                setLocation(data.city || data.locality);
              } else if (data.principalSubdivision) {
                setLocation(data.principalSubdivision);
              } else {
                setLocation(`${lat.toFixed(2)}, ${lon.toFixed(2)}`);
              }
            })
            .catch(() => setLocation("Unknown"));
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setLocation("Permission denied");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className={cls.icon_wrapper}>
      {show && (
        <div className={`${cls.forecast} ${show ? cls.show : ""}`}>
          {forecast.map((f, i) => (
            <div
              key={i}
              style={{
                width: "60px",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={() => handleSmallHover(i)}
            >
              <p className={cls.weak_line}>{f.day}</p>
              <div className={`${smallAnimate[i] ? cls.animate : ""}`}>
                {f.weather == "Clouds" ? (
                  <SunClouds width={40} height={40} />
                ) : (
                  <SunIcon width={40} height={40} />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <p>{f.high}°</p>
                <p className={cls.weak_line}>{f.low}°</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className={`${cls.button} ${show ? cls.rotate : ""}`}
        onClick={() => setShow((prev) => !prev)}
      >
        <LeftSwiper />
      </button>

      <div
        className={`${cls.sunIconWrapper} ${bigAnimate ? cls.animate : ""}`}
        onMouseEnter={handleBigHover}
      >
        <SunIcon width={80} height={80} />
      </div>

      <div>
        <div className={cls.location}>
          <p className={cls.weak_line}>{location}</p>
          <button className={cls.button} onClick={handleGetLocation}>
            <TargetIcon width={15} height={15} />
          </button>
        </div>
        <h1
          style={{
            fontSize: "34px",
            fontWeight: "400",
            padding: "0",
            margin: 0,
          }}
        >
          {forecast[0].high}°C
        </h1>
        <a
          style={{ textDecoration: "none", color: "blue" }}
          href="https://the-weather-project-vercel.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          Google Weather
        </a>
      </div>
    </div>
  );
};

export default WeatherCard;
