"use client";
import React, { useState, useRef, useEffect } from "react";
import cls from "./Navbar.module.css";
import { CgMenuGridO } from "react-icons/cg";
import Image from "next/image";
import Link from "next/link";

interface AppsMenuProps {
  selectedLang: string;
}

const translations: Record<string, any> = {
  "en-US": {
    main: ["Drive", "Gmail", "Gemini", "Maps", "Google", "Calendar", "News", "Photos", "Meet", "Translate", "Sheets", "Docs", "Slides", "Google One"],
    more: ["Shopping", "Play", "Finance", "Classroom", "Keep", "My Center", "Chat", "Earth", "Saved", "Arts & Culture", "Merchant Center", "Contacts", "Travel", "Forms", "Books", "Chrome", "Password", "Analytics", "Blogger", "Wallet", "NotebookLM"],
    moreLink: "More from Google"
  },
  "ru-RU": {
    main: ["Диск", "Почта", "Gemini", "Карты", "Google", "Календарь", "Новости", "Фото", "Meet", "Переводчик", "Таблицы", "Документы", "Презентации", "Google One"],
    more: ["Покупки", "Play", "Финансы", "Classroom", "Keep", "Мой центр", "Чат", "Земля", "Сохранённое", "Искусство и культура", "Merchant Center", "Контакты", "Путешествия", "Формы", "Книги", "Chrome", "Пароли", "Аналитика", "Blogger", "Кошелёк", "NotebookLM"],
    moreLink: "Ещё от Google"
  },
  "zh-TW": {
    main: ["雲端硬碟","Gmail","Gemini","地圖","Google","行事曆","新聞","相簿","Meet","翻譯","試算表","文件","簡報","Google One"],
    more: ["購物","Play","財務","Classroom","Keep","我的中心","聊天","地球","已儲存","藝術與文化","Merchant Center","聯絡人","旅遊","表單","圖書","Chrome","密碼","分析","Blogger","錢包","NotebookLM"],
    moreLink: "更多 Google 服務"
  },
  "uz-UZ": {
    main: ["Drive", "Gmail", "Gemini", "Xaritalar", "Google", "Kalendar", "Yangiliklar", "Fotosuratlar", "Meet", "Tarjimon", "Jadvallar", "Hujjatlar", "Slaydlar", "Google One"],
    more: ["Savdo", "Play", "Moliyaviy", "Classroom", "Keep", "Mening Markazim", "Chat", "Yer", "Saqlangan", "San’at & Madaniyat", "Merchant Center", "Kontaktlar", "Sayohat", "Formalar", "Kitoblar", "Chrome", "Parollar", "Analitika", "Blogger", "Hamyon", "NotebookLM"],
    moreLink: "Boshqa Google xizmatlari"
  },
  "kz-KZ": {
    main: ["Drive", "Gmail", "Gemini", "Карталар", "Google", "Күнтізбе", "Жаңалықтар", "Суреттер", "Meet", "Аударма", "Кестелер", "Құжаттар", "Слайдтар", "Google One"],
    more: ["Сауда", "Play", "Қаржы", "Classroom", "Keep", "Менің орталық", "Chat", "Жер", "Сақталғандар", "Өнер & Мәдениет", "Merchant Center", "Байланыстар", "Саяхат", "Формалар", "Кітаптар", "Chrome", "Құпиясөздер", "Аналитика", "Blogger", "Төмөн", "NotebookLM"],
    moreLink: "Google-дан тағы"
  },
  "in-IN": {
    main: ["Drive", "Gmail", "Gemini", "मानचित्र", "Google", "कैलेंडर", "समाचार", "फ़ोटो", "Meet", "अनुवाद", "Sheets", "Docs", "Slides", "Google One"],
    more: ["शॉपिंग", "Play", "वित्त", "Classroom", "Keep", "मेरा केंद्र", "Chat", "Earth", "Saved", "कला और संस्कृति", "Merchant Center", "संपर्क", "यात्रा", "Forms", "Books", "Chrome", "Password", "Analytics", "Blogger", "Wallet", "NotebookLM"],
    moreLink: "Google से अधिक"
  },
  "tr-TR": {
    main: ["Drive", "Gmail", "Gemini", "Haritalar", "Google", "Takvim", "Haberler", "Fotoğraflar", "Meet", "Çeviri", "Sheets", "Docs", "Slaytlar", "Google One"],
    more: ["Alışveriş", "Play", "Finans", "Classroom", "Keep", "Merkezim", "Chat", "Dünya", "Kaydedilenler", "Sanat & Kültür", "Merchant Center", "Kişiler", "Seyahat", "Formlar", "Kitaplar", "Chrome", "Parolalar", "Analytics", "Blogger", "Cüzdan", "NotebookLM"],
    moreLink: "Google'dan daha fazlası"
  },
};

const AppsMenu: React.FC<AppsMenuProps> = ({ selectedLang }) => {
  const [openApps, setOpenApps] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const mainAppsSrc = [
    "/images/drive.png","/images/email.png","/images/gemini-color.svg","/images/maps.png",
    "/images/google.png","/images/calendar.png","/images/news.png","/images/photos.png",
    "/images/meet.png","/images/translate.png","/images/sheets.png","/images/docs.png",
    "/images/slides.png","/images/one.png"
  ];

  const mainAppsLink = [
    "https://drive.google.com","https://mail.google.com","https://gemini.google.com","https://maps.google.com",
    "https://www.google.com","https://calendar.google.com","https://news.google.com","https://photos.google.com",
    "https://meet.google.com","https://translate.google.com","https://sheets.google.com","https://docs.google.com",
    "https://slides.google.com","https://one.google.com"
  ];

  const moreAppsSrc = [
    "/images/shopping.png","/images/play.png","/images/finance.png","/images/classroom.png","/images/keep.png",
    "/images/mycenter.png","/images/chat.png","/images/earth.png","/images/saved.png","/images/arts.png",
    "/images/merchant.svg","/images/contacts.png","/images/travel.png","/images/forms.png","/images/books.png",
    "/images/chrome.png","/images/password.png","/images/analytics.png","/images/blogger.png","/images/wallet.png",
    "/images/notebooklm.svg"
  ];

  const moreAppsLink = [
    "https://shopping.google.com","https://play.google.com","https://www.google.com/finance","https://classroom.google.com","https://keep.google.com",
    "https://support.google.com","https://chat.google.com","https://earth.google.com","https://www.google.com/interests/saved","https://artsandculture.google.com",
    "https://merchants.google.com","https://contacts.google.com","https://www.google.com/travel","https://forms.google.com","https://books.google.com",
    "https://www.google.com/chrome","https://passwords.google/","https://analytics.google.com","https://www.blogger.com","https://wallet.google.com",
    "https://notebooklm.google.com"
  ];

  const t = translations[selectedLang] || translations["en-US"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenApps(false);
      }
    };
    if (openApps) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openApps]);

  return (
    <div className={cls["icon-wrapper"]} ref={menuRef}>
      <CgMenuGridO className={cls.icon} onClick={() => setOpenApps(!openApps)} />
      {openApps && (
        <div className={cls["apps"]}>
          <div className={cls["apps-dropdown"]}>
            <div className={cls["apps-section"]}>
              {mainAppsSrc.map((src, i) => (
                <Link key={i} href={mainAppsLink[i]} className={cls["app-item"]} target="_blank">
                  <Image src={src} alt={t.main[i]} width={32} height={32} />
                  <span>{t.main[i]}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className={cls["apps-dropdown"]}>
            <div className={cls["apps-section"]}>
              {moreAppsSrc.map((src, i) => (
                <Link key={i} href={moreAppsLink[i]} className={cls["app-item"]} target="_blank">
                  <Image src={src} alt={t.more[i]} width={32} height={32} />
                  <span>{t.more[i]}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link href="https://about.google/products/" className={cls["apps-link"]} target="_blank">
            {t.moreLink}
          </Link>
        </div>
      )}
    </div>
  );
};

export default AppsMenu;
