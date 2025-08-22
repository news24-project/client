"use client";
import React, { useState } from "react";
import cls from "./Sidebar.module.css";
import { FaHome, FaStar, FaSearch } from "react-icons/fa";
import {
  MdPublic,
  MdBusiness,
  MdScience,
  MdOutlinedFlag,
  MdOutlineScience,
} from "react-icons/md";
import { GiFilmSpool, GiCycling } from "react-icons/gi";
import { SiCreativetechnology } from "react-icons/si";
import { LuMapPin } from "react-icons/lu";
import { useRouter } from "next/navigation";
import LanguageModal from "@/components/Language";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedLang: string; 
  setSelectedLang: React.Dispatch<React.SetStateAction<string>>; 
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  toggleSidebar,
  selectedLang,
  setSelectedLang,
}) => {
  const [openLanguage, setOpenLanguage] = useState(false);

  const categories = [
    { label: "Home", icon: <FaHome /> },
    { label: "Following", icon: <FaStar /> },
    { label: "Saved searches", icon: <FaSearch /> },
    { label: "U.S.", icon: <MdOutlinedFlag /> },
    { label: "World", icon: <MdPublic /> },
    { label: "Your local news", icon: <LuMapPin /> },
    { label: "Business", icon: <MdBusiness /> },
    { label: "Technology", icon: <SiCreativetechnology /> },
    { label: "Entertainment", icon: <GiFilmSpool /> },
    { label: "Sports", icon: <GiCycling /> },
    { label: "Science", icon: <MdOutlineScience /> },
    { label: "Health", icon: <MdScience /> },
    { label: "Language & region" },
    { label: "Settings" },
    { label: "Get the Android app" },
    { label: "Send feedback" },
    { label: "Help" },
  ];

  const router = useRouter();

  const translations: Record<string, any> = {
    "en-US": {
      languageLabel: "English (United States)",
      modalTitle: "Language & region of interest",
      modalDesc: "See news from the selected language and region pair",
      searchPlaceholder: "Search for language or region",
      buttons: { cancel: "Cancel", update: "Update" },
      language: "Language",
    },
    "ru-RU": {
      languageLabel: "Русский (Россия)",
      modalTitle: "Язык и регион",
      modalDesc: "Смотрите новости на выбранном языке и регионе",
      searchPlaceholder: "Поиск языка или региона",
      buttons: { cancel: "Отмена", update: "Обновить" },
      language: "Язык",
    },
    "uz-UZ": {
      languageLabel: "O‘zbek (O‘zbekiston)",
      modalTitle: "Til va mintaqa",
      modalDesc: "Tanlangan til va mintaqadagi yangiliklarni ko‘ring",
      searchPlaceholder: "Til yoki mintaqani qidirish",
      buttons: { cancel: "Bekor qilish", update: "Yangilash" },
      language: "Til",
    },
    "kz-KZ": {
      languageLabel: "Қазақ (Қазақстан)",
      modalTitle: "Тiл мен аймақ",
      modalDesc: "Таңдалған тіл мен аймақтағы жаңалықтарды қараңыз",
      searchPlaceholder: "Тіл немесе аймақты іздеу",
      buttons: { cancel: "Бас тарту", update: "Жаңарту" },
      language: "Тiл",
    },
    "in-IN": {
      languageLabel: "Hindi (India)",
      modalTitle: "भाषा और क्षेत्र",
      modalDesc: "चयनित भाषा और क्षेत्र की खबरें देखें",
      searchPlaceholder: "भाषा या क्षेत्र खोजें",
      buttons: { cancel: "रद्द करें", update: "अपडेट करें" },
      language: "भाषा",
    },
    "tr-TR": {
      languageLabel: "Türkçe (Türkiye)",
      modalTitle: "Dil ve bölge",
      modalDesc: "Seçilen dil ve bölgeden haberleri görüntüleyin",
      searchPlaceholder: "Dil veya bölge ara",
      buttons: { cancel: "İptal", update: "Güncelle" },
      language: "Dil",
    },
    "zh-TW": {
      languageLabel: "中文 (台灣)",
      modalTitle: "語言與地區設定",
      modalDesc: "查看所選語言和地區的新聞",
      searchPlaceholder: "搜尋語言或地區",
      buttons: { cancel: "取消", update: "更新" },
      language: "語言",
    },
  };

  return (
    <>
      <div className={`${cls.sidebar} ${sidebarOpen ? cls.open : ""}`}>
        <ul className={cls["sidebar-list"]}>
          {categories.map((cat, i) => (
            <React.Fragment key={i}>
              {(i === 3 || i === 12) && (
                <hr className={cls["sidebar-divider"]} />
              )}
              <li
                className={cls["sidebar-item"]}
                onClick={() => {
                  if (cat.label === "Language & region") {
                    setOpenLanguage(true);
                  } else if (cat.label === "Settings") {
                    router.push("/settings");
                  }
                   toggleSidebar();
                }}
              >
                <span className={cls["sidebar-icon"]}>{cat.icon}</span>
                <span className={cls["sidebar-label"]}>{cat.label}</span>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>

      {openLanguage && (
        <LanguageModal
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
          setOpenLanguage={setOpenLanguage}
          translations={translations}
        />
      )}
    </>
  );
};

export default Sidebar;
