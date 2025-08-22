"use client";
import React, { useState } from "react";
import cls from "./Navbar.module.css";
import { IoIosArrowRoundBack, IoIosSearch } from "react-icons/io";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import CustomSelect from "@/components/Select";
import { Option } from "@/types";

interface SearchBarProps {
  selectedLang: string;
}

const translations: Record<string, any> = {
  "en-US": {
    placeholder: "Search for topics, locations & sources",
    narrowResults: "Narrow your search results",
    exactPhrase: "Exact phrase",
    hasWords: "Has words",
    excludeWords: "Exclude words",
    website: "Website",
    date: "Date",
    clear: "Clear",
    search: "Search",
    selectDate: "Select date",
  },
  "ru-RU": {
    placeholder: "Поиск по темам, местоположению и источникам",
    narrowResults: "Уточните результаты поиска",
    exactPhrase: "Точная фраза",
    hasWords: "Слова в тексте",
    excludeWords: "Исключить слова",
    website: "Сайт",
    date: "Дата",
    clear: "Очистить",
    search: "Поиск",
    selectDate: "Выберите дату",
  },
  "zh-TW": {
    placeholder: "搜尋主題、地點和來源",
    narrowResults: "縮小搜尋結果",
    exactPhrase: "精確詞組",
    hasWords: "包含詞語",
    excludeWords: "排除詞語",
    website: "網站",
    date: "日期",
    clear: "清除",
    search: "搜尋",
    selectDate: "選擇日期",
  },
  "uz-UZ": {
    placeholder: "Mavzular, joylashuv va manbalarni qidiring",
    narrowResults: "Qidiruv natijalarini toraytiring",
    exactPhrase: "Aniq ibora",
    hasWords: "So‘zlar mavjud",
    excludeWords: "So‘zlarni chiqarib tashlash",
    website: "Veb-sayt",
    date: "Sana",
    clear: "Tozalash",
    search: "Qidirish",
    selectDate: "Sana tanlang",
  },
  "kz-KZ": {
    placeholder: "Тақырыптар, орындар мен дереккөздерді іздеу",
    narrowResults: "Іздеу нәтижелерін тарылту",
    exactPhrase: "Дәл сөз тіркесі",
    hasWords: "Сөздер бар",
    excludeWords: "Сөздерді шығару",
    website: "Веб-сайт",
    date: "Күні",
    clear: "Тазалау",
    search: "Іздеу",
    selectDate: "Күнді таңдаңыз",
  },
  "in-IN": {
    placeholder: "विषयों, स्थानों और स्रोतों के लिए खोजें",
    narrowResults: "खोज परिणामों को सीमित करें",
    exactPhrase: "सटीक वाक्यांश",
    hasWords: "शब्द शामिल हैं",
    excludeWords: "शब्द बाहर करें",
    website: "वेबसाइट",
    date: "दिनांक",
    clear: "साफ़ करें",
    search: "खोजें",
    selectDate: "तारीख़ चुनें",
  },
  "tr-TR": {
    placeholder: "Konu, konum ve kaynakları ara",
    narrowResults: "Arama sonuçlarını daralt",
    exactPhrase: "Tam ifade",
    hasWords: "Kelime içerir",
    excludeWords: "Kelime hariç",
    website: "Web sitesi",
    date: "Tarih",
    clear: "Temizle",
    search: "Ara",
    selectDate: "Tarih seçin",
  },
};

const dateOptionsTranslations: Record<string, Option[]> = {
  "en-US": [
    { value: "anytime", label: "Anytime" },
    { value: "24h", label: "Past 24 hours" },
    { value: "week", label: "Past week" },
    { value: "month", label: "Past month" },
    { value: "year", label: "Past year" },
  ],
  "ru-RU": [
    { value: "anytime", label: "Любое время" },
    { value: "24h", label: "За последние 24 часа" },
    { value: "week", label: "За неделю" },
    { value: "month", label: "За месяц" },
    { value: "year", label: "За год" },
  ],
  "zh-TW": [
    { value: "anytime", label: "任何時間" },
    { value: "24h", label: "過去 24 小時" },
    { value: "week", label: "過去一週" },
    { value: "month", label: "過去一個月" },
    { value: "year", label: "過去一年" },
  ],
  "uz-UZ": [
    { value: "anytime", label: "Har qanday vaqt" },
    { value: "24h", label: "So‘nggi 24 soat" },
    { value: "week", label: "So‘nggi hafta" },
    { value: "month", label: "So‘nggi oy" },
    { value: "year", label: "So‘nggi yil" },
  ],
  "kz-KZ": [
    { value: "anytime", label: "Қандай да уақыт" },
    { value: "24h", label: "Соңғы 24 сағат" },
    { value: "week", label: "Соңғы апта" },
    { value: "month", label: "Соңғы ай" },
    { value: "year", label: "Соңғы жыл" },
  ],
  "in-IN": [
    { value: "anytime", label: "किसी भी समय" },
    { value: "24h", label: "पिछले 24 घंटे" },
    { value: "week", label: "पिछला सप्ताह" },
    { value: "month", label: "पिछला महीना" },
    { value: "year", label: "पिछला साल" },
  ],
  "tr-TR": [
    { value: "anytime", label: "Her zaman" },
    { value: "24h", label: "Son 24 saat" },
    { value: "week", label: "Geçen hafta" },
    { value: "month", label: "Geçen ay" },
    { value: "year", label: "Geçen yıl" },
  ],
};

const SearchBar: React.FC<SearchBarProps> = ({ selectedLang }) => {
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Option | null>(null);

  const t = translations[selectedLang];
  const dateOptions = dateOptionsTranslations[selectedLang];

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
                options={dateOptions}
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
