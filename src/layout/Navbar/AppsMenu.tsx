"use client";
import React, { useState, useRef, useEffect } from "react";
import cls from "./Navbar.module.css";
import { CgMenuGridO } from "react-icons/cg";
import Image from "next/image";
import Link from "next/link";

const AppsMenu = () => {
  const [openApps, setOpenApps] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const mainApps = [
    { src: "/images/drive.png", alt: "Drive", label: "Drive", link: "https://drive.google.com" },
    { src: "/images/email.png", alt: "Gmail", label: "Gmail", link: "https://mail.google.com" },
    { src: "/images/gemini-color.svg", alt: "Gemini", label: "Gemini", link: "https://gemini.google.com" },
    { src: "/images/maps.png", alt: "Maps", label: "Maps", link: "https://maps.google.com" },
    { src: "/images/google.png", alt: "Google", label: "Google", link: "https://www.google.com" },
    { src: "/images/calendar.png", alt: "Calendar", label: "Calendar", link: "https://calendar.google.com" },
    { src: "/images/news.png", alt: "News", label: "News", link: "https://news.google.com" },
    { src: "/images/photos.png", alt: "Photos", label: "Photos", link: "https://photos.google.com" },
    { src: "/images/meet.png", alt: "Meet", label: "Meet", link: "https://meet.google.com" },
    { src: "/images/translate.png", alt: "Translate", label: "Translate", link: "https://translate.google.com" },
    { src: "/images/sheets.png", alt: "Sheets", label: "Sheets", link: "https://sheets.google.com" },
    { src: "/images/docs.png", alt: "Docs", label: "Docs", link: "https://docs.google.com" },
    { src: "/images/slides.png", alt: "Slides", label: "Slides", link: "https://slides.google.com" },
    { src: "/images/one.png", alt: "Google One", label: "Google One", link: "https://one.google.com" },
  ];

  const moreApps = [
    { src: "/images/shopping.png", alt: "Shopping", label: "Shopping", link: "https://shopping.google.com" },
    { src: "/images/play.png", alt: "Play", label: "Play", link: "https://play.google.com" },
    { src: "/images/finance.png", alt: "Finance", label: "Finance", link: "https://www.google.com/finance" },
    { src: "/images/classroom.png", alt: "Classroom", label: "Classroom", link: "https://classroom.google.com" },
    { src: "/images/keep.png", alt: "Keep", label: "Keep", link: "https://keep.google.com" },
    { src: "/images/mycenter.png", alt: "My Center", label: "My Center", link: "https://support.google.com" },
    { src: "/images/chat.png", alt: "Chat", label: "Chat", link: "https://chat.google.com" },
    { src: "/images/earth.png", alt: "Earth", label: "Earth", link: "https://earth.google.com" },
    { src: "/images/saved.png", alt: "Saved", label: "Saved", link: "https://www.google.com/interests/saved" },
    { src: "/images/arts.png", alt: "Arts & Culture", label: "Arts & Culture", link: "https://artsandculture.google.com" },
    { src: "/images/merchant.svg", alt: "Merchant Center", label: "Merchant Center", link: "https://merchants.google.com" },
    { src: "/images/contacts.png", alt: "Contacts", label: "Contacts", link: "https://contacts.google.com" },
    { src: "/images/travel.png", alt: "Travel", label: "Travel", link: "https://www.google.com/travel" },
    { src: "/images/forms.png", alt: "Forms", label: "Forms", link: "https://forms.google.com" },
    { src: "/images/books.png", alt: "Books", label: "Books", link: "https://books.google.com" },
    { src: "/images/chrome.png", alt: "Chrome", label: "Chrome", link: "https://www.google.com/chrome" },
    { src: "/images/password.png", alt: "Password", label: "Password", link: "https://passwords.google/" },
    { src: "/images/analytics.png", alt: "Analytics", label: "Analytics", link: "https://analytics.google.com" },
    { src: "/images/blogger.png", alt: "Blogger", label: "Blogger", link: "https://www.blogger.com" },
    { src: "/images/wallet.png", alt: "Wallet", label: "Wallet", link: "https://wallet.google.com" },
    { src: "/images/notebooklm.svg", alt: "NotebookLM", label: "NotebookLM", link: "https://notebooklm.google.com" },
  ];

  // outside click uchun listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenApps(false);
      }
    };
    if (openApps) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openApps]);

  return (
    <div className={cls["icon-wrapper"]} ref={menuRef}>
      <CgMenuGridO
        className={cls.icon}
        onClick={() => setOpenApps(!openApps)}
      />
      {openApps && (
        <div className={cls["apps"]}>
          <div className={cls["apps-dropdown"]}>
            <div className={cls["apps-section"]}>
              {mainApps.map((item, i) => (
                <Link key={i} href={item.link} className={cls["app-item"]} target="_blank">
                  <Image src={item.src} alt={item.alt} width={32} height={32} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className={cls["apps-dropdown"]}>
            <div className={cls["apps-section"]}>
              {moreApps.map((item, i) => (
                <Link key={i} href={item.link} className={cls["app-item"]} target="_blank">
                  <Image src={item.src} alt={item.alt} width={32} height={32} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link href="https://about.google/products/" className={cls["apps-link"]} target="_blank">
            More from Google
          </Link>
        </div>
      )}
    </div>
  );
};

export default AppsMenu;
