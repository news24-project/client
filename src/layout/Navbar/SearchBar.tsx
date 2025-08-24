"use client";
import React, { useState } from "react";
import cls from "./Navbar.module.css";
import { IoIosArrowRoundBack, IoIosSearch } from "react-icons/io";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import CustomSelect from "@/components/Select";
import { Option } from "@/types";
import { translations } from "@/app/translation";
import { useLanguage } from "@/app/LanguageProvider";

const SearchBar: React.FC = () => {
  const { selectedLang } = useLanguage();
  const t = translations[selectedLang].searchBar;

  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Option | null>(null);

  return (
    <div className={cls["navbar-center"]}>
      <div className={`${cls["navbar-search"]}`}>
        <IoIosSearch
          className={cls["search-icon"]}
          onClick={() => setDesktopOpen(!desktopOpen)}
        />
        <input
          type="search"
          placeholder={t.placeholder}
          className={`${cls["search-input"]} ${desktopOpen ? cls.show : ""}`}
        />
        <div
          onClick={() => setDesktopOpen(!desktopOpen)}
          className={cls["arrow-btn"]}
        >
          {desktopOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {desktopOpen && (
          <div className={cls["search-dropdown"]}>
            <p>{t.narrowResults}</p>
            <label>
              {t.exactPhrase} <input type="text" />
            </label>
            <label>
              {t.hasWords} <input type="text" />
            </label>
            <label>
              {t.excludeWords} <input type="text" />
            </label>
            <label>
              {t.website} <input type="text" />
            </label>
            <label>
              {t.date}
              <CustomSelect
                style={{ backgroundColor: "#4b4c4d", width: "200px" }}
                value={selectedDate}
                onChange={setSelectedDate}
                options={t.dateOptions}
                placeholder={t.selectDate}
                icon={<TiArrowSortedUp />}
                iconPosition="right"
              />
            </label>
            <div className={cls["filter-actions"]}>
              <button className={cls["clear-btn"]}>{t.clear}</button>
              <button className={cls["search-btn"]}>{t.search}</button>
            </div>
          </div>
        )}
      </div>

      <div className={cls["mobile-search-icon"]}>
        <IoIosSearch
          className={cls["search-icon"]}
          onClick={() => setMobileOpen(true)}
          size={24}
          color="#fff"
        />
      </div>

      {mobileOpen && (
        <div className={cls["mobile-search"]}>
          <IoIosArrowRoundBack
            className={cls["mobile-close-btn"]}
            onClick={() => setMobileOpen(false)}
          />
          <input
            type="search"
            placeholder={t.placeholder}
            className={cls["mobile-input"]}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
