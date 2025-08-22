"use client";

import React, { useState } from "react";
import cls from "./Settings.module.css";
import Link from "next/link";

const Settings = () => {
  const [theme, setTheme] = useState("system");
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [openTheme, setOpenTheme] = useState(false);
  const [openTemp, setOpenTemp] = useState(false);

  const handleManageSources = () => {
    alert("Manage hidden sources clicked!");
  };

  const themeOptions = [
    { value: "never", label: "Never" },
    { value: "always", label: "Always" },
    { value: "system", label: "System default (when available)" },
  ];

  const tempOptions = [
    { value: "celsius", label: "Celsius (°C)" },
    { value: "fahrenheit", label: "Fahrenheit (°F)" },
    { value: "kelvin", label: "Kelvin" },
  ];

  return (
    <div className={cls["settings"]}>
      <div className={cls["settings-container"]}>
        <h1 className={cls["settings-title"]}>General</h1>
        <hr className={cls["settings-hr"]} />

        <div className={cls["settings-flex"]}>
          <p>Hidden sources</p>
          <button onClick={handleManageSources} className={cls["settings-btn"]}>
            Manage
          </button>
        </div>
        <hr className={cls["settings-hr"]} />

        <div className={cls["settings-flex"]}>
          <p>
            My activity <br />
            <span className={cls["settings-span"]}>
              Signed in as nurkenqaldybaev2001@gmail.com
            </span>
          </p>
          <Link
            href={"https://myactivity.google.com"}
            className={cls["settings-btn"]}
          >
            View
          </Link>
        </div>
        <hr className={cls["settings-hr"]} />

        <div className={cls["settings-flex"]}>
          <p>Dark theme</p>
          <div className={cls["select-container"]}>
            <label className={cls["custom-label"]}>Dark theme</label>
            <div
              className={cls["custom-select"]}
              onClick={() => setOpenTheme(!openTheme)}
            >
              {themeOptions.find((opt) => opt.value === theme)?.label}
              <span className={cls["arrow"]}>{openTheme ? "▲" : "▼"}</span>
            </div>
            {openTheme && (
              <ul className={cls["dropdown"]}>
                {themeOptions.map((opt) => (
                  <li
                    key={opt.value}
                    onClick={() => {
                      setTheme(opt.value);
                      setOpenTheme(false);
                    }}
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <hr className={cls["settings-hr"]} />

        <div className={cls["settings-flex"]}>
          <p>Temperature unit</p>
          <div className={cls["custom-select-container"]}>
            <label className={cls["custom-label"]}>Temperature unit</label>
            <div
              className={cls["custom-select"]}
              onClick={() => setOpenTemp(!openTemp)}
            >
              {tempOptions.find((opt) => opt.value === temperatureUnit)?.label}
              <span className={cls["arrow"]}>{openTemp ? "▲" : "▼"}</span>
            </div>
            {openTemp && (
              <ul className={cls["dropdown"]}>
                {tempOptions.map((opt) => (
                  <li
                    key={opt.value}
                    onClick={() => {
                      setTemperatureUnit(opt.value);
                      setOpenTemp(false);
                    }}
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className={cls["settings-footer"]}>
        <Link
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className={cls["footer-link"]}
        >
          Privacy policy
        </Link>
        <Link
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className={cls["footer-link"]}
        >
          Terms of service
        </Link>
        <Link
          href="https://www.google.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className={cls["footer-link"]}
        >
          About Google
        </Link>
      </div>
    </div>
  );
};

export default Settings;
