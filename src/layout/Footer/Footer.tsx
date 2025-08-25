"use client";
import React from "react";
import { FaHome } from "react-icons/fa";
import { IoIosStarOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import cls from "./Footer.module.css";
import { useLanguage } from "@/app/LanguageProvider";
import { translations } from "@/app/translation";

const Footer = () => {
  const { selectedLang } = useLanguage(); // to'g'ri destructuring
  const t = translations[selectedLang]?.footer; // footer matnlari
  const router = useRouter();

  return (
    <div className={cls.footer}>
      <div className={cls.item}>
        <div className={cls.iconWrapper} onClick={() => router.push("/")}>
          <FaHome size={22} />
        </div>
        <span>{t?.home}</span>
      </div>

      <div className={cls.item}>
        <div
          className={cls.iconWrapper}
          onClick={() => router.push("/following")}
        >
          <IoIosStarOutline size={24} />
        </div>
        <span>{t?.following}</span>
      </div>
    </div>
  );
};

export default Footer;
