"use client";
import React, { useState } from "react";
import cls from "./Navbar.module.css";
import { IoIosArrowRoundBack, IoIosSearch } from "react-icons/io";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import CustomSelect from "@/components/Select";
import { Option } from "@/types";
import { translations } from "@/app/translation";
import { useLanguage } from "@/app/LanguageProvider";
import { useRouter } from "next/navigation";  // ✅ Router

const SearchBar: React.FC = () => {
  const { selectedLang } = useLanguage();
  const t = translations[selectedLang].searchBar;
  const router = useRouter();

  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Option | null>(null);

  const [query, setQuery] = useState(""); 
  const [exactPhrase, setExactPhrase] = useState("");
  const [hasWords, setHasWords] = useState("");
  const [excludeWords, setExcludeWords] = useState("");
  const [website, setWebsite] = useState("");

  // 🔎 Oddiy qidiruv
  const handleMainSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?main=${encodeURIComponent(query)}`);
  };

  // 🔎 Kengaytirilgan qidiruv
  const handleAdvancedSearch = () => {
    const params = new URLSearchParams();
    if (query) params.append("main", query);
    if (exactPhrase) params.append("exactPhrase", exactPhrase);
    if (hasWords) params.append("hasWords", hasWords);
    if (excludeWords) params.append("excludeWords", excludeWords);
    if (website) params.append("website", website);
    if (selectedDate?.value) params.append("date", String(selectedDate));

    router.push(`/search?${params.toString()}`);
  };

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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleMainSearch()} 
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
              {t.exactPhrase}{" "}
              <input type="text" value={exactPhrase} onChange={(e) => setExactPhrase(e.target.value)} />
            </label>
            <label>
              {t.hasWords}{" "}
              <input type="text" value={hasWords} onChange={(e) => setHasWords(e.target.value)} />
            </label>
            <label>
              {t.excludeWords}{" "}
              <input type="text" value={excludeWords} onChange={(e) => setExcludeWords(e.target.value)} />
            </label>
            <label>
              {t.website}{" "}
              <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
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
              <button
                className={cls["clear-btn"]}
                onClick={() => {
                  setQuery(""); setExactPhrase(""); setHasWords("");
                  setExcludeWords(""); setWebsite(""); setSelectedDate(null);
                }}
              >
                {t.clear}
              </button>
              <button className={cls["search-btn"]} onClick={handleAdvancedSearch}>
                {t.search}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 📱 Mobile search */}
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleMainSearch()} 
            className={cls["mobile-input"]}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
