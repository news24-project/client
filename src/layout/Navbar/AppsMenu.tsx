"use client";
import React, { useState, useRef, useEffect } from "react";
import cls from "./Navbar.module.css";
import { CgMenuGridO } from "react-icons/cg";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/LanguageProvider";
import { translations } from "@/app/translation";

const AppsMenu: React.FC = () => {
  const { selectedLang } = useLanguage();
  const [openApps, setOpenApps] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const t = translations[selectedLang]?.appsMenu || translations["en-US"].appsMenu;

 
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
