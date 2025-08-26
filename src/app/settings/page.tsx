"use client";

import React, { useState } from "react";
import cls from "./Settings.module.css";
import Link from "next/link";
import { useLanguage } from "@/app/LanguageProvider";
import { translations } from "../translation";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const Settings = () => {
  const { selectedLang } = useLanguage();
  const t = translations[selectedLang]?.settings;

  const [theme, setTheme] = useState("system");
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [openTheme, setOpenTheme] = useState(false);
  const [openTemp, setOpenTemp] = useState(false);

  const themeOptions = [
    { value: "never", label: t.themeOptions.never },
    { value: "always", label: t.themeOptions.always },
    { value: "system", label: t.themeOptions.system },
  ];

  const tempOptions = [
    { value: "celsius", label: t.tempOptions.celsius },
    { value: "fahrenheit", label: t.tempOptions.fahrenheit },
    { value: "kelvin", label: t.tempOptions.kelvin },
  ];

  return (
    <div className={cls["settings"]}>
      <div className={cls["settings-container"]}>
        <h1 className={cls["settings-title"]}>{t.general}</h1>
        <hr className={cls["settings-hr"]} />

        <div className={cls["settings-flex"]}>
          <p>{t.hiddenSources}</p>
          <button
            onClick={() => alert("clicked")}
            className={cls["settings-btn"]}
          >
            {t.manage}
          </button>
        </div>
        <hr className={cls["settings-hr"]} />

        <div className={cls["settings-flex"]}>
          <p>
            {t.myActivity} <br />
            <span className={cls["settings-span"]}>
              {t.signedIn} nurkenqaldybaev2001@gmail.com
            </span>
          </p>
          <Link
            href={"https://myactivity.google.com"}
            className={cls["settings-btn"]}
          >
            {t.view}
          </Link>
        </div>
        <hr className={cls["settings-hr"]} />

        <div className={cls["settings-flex"]}>
          <p className={cls["select-label"]}>{t.darkTheme}</p>
          <div className={cls["select-container"]}>
            <label className={cls["custom-label"]}>{t.darkTheme}</label>
            <div
              className={cls["custom-select"]}
              onClick={() => setOpenTheme(!openTheme)}
            >
              {themeOptions.find((opt) => opt.value === theme)?.label}
              <span className={cls["arrow"]}>
                {openTheme ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
              </span>
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
          <p>{t.temperatureUnit}</p>
          <div className={cls["custom-select-container"]}>
            <label className={cls["custom-label"]}>{t.temperatureUnit}</label>
            <div
              className={cls["custom-select"]}
              onClick={() => setOpenTemp(!openTemp)}
            >
              {tempOptions.find((opt) => opt.value === temperatureUnit)?.label}
              <span className={cls["arrow"]}>
                {openTemp ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
              </span>
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
          className={cls["footer-link"]}
        >
          {t.privacy}
        </Link>
        <Link
          href="https://policies.google.com/terms"
          target="_blank"
          className={cls["footer-link"]}
        >
          {t.terms}
        </Link>
        <Link
          href="https://www.google.com/about"
          target="_blank"
          className={cls["footer-link"]}
        >
          {t.about}
        </Link>
      </div>
    </div>
  );
};

export default Settings;
