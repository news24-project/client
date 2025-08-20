"use client";

import { useState } from "react";
import LeftSwiper from "../../../public/icons/left_swiper";
import SunIcon from "../../../public/icons/sun";
import TargetIcon from "../../../public/icons/target";
import cls from "./whether.module.css";

const WhetherCard = () => {
  const [show, setShow] = useState(false);
  const [bigAnimate, setBigAnimate] = useState(false);
  const [bigCooldown, setBigCooldown] = useState(false);

  const forecast = [
    { day: "Today", high: 32, low: 21 },
    { day: "Tomorrow", high: 30, low: 20 },
    { day: "Wed", high: 29, low: 19 },
    { day: "Thu", high: 31, low: 22 },
  ];

  // For small icons, track animation and cooldown per index
  const [smallAnimate, setSmallAnimate] = useState<Record<number, boolean>>({});
  const [smallCooldown, setSmallCooldown] = useState<Record<number, boolean>>(
    {}
  );

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
              <p>{f.day}</p>
              <div className={`${smallAnimate[i] ? cls.animate : ""}`}>
                <SunIcon width={40} height={40} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <p>{f.high}°</p>
                <p>{f.low}°</p>
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
          <p>Tashkent</p>
          <button className={cls.button}>
            <TargetIcon />
          </button>
        </div>
        <h1>34°C</h1>
        <a href="https://weather.google.com" target="_blank" rel="noreferrer">
          Google Weather
        </a>
      </div>
    </div>
  );
};

export default WhetherCard;
