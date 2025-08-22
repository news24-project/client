"use client";
import React, { useState, useRef, useEffect } from "react";
import cls from "./Navbar.module.css";
import { IoSettingsOutline } from "react-icons/io5";
import { Option } from "@/types";
import { useRouter } from "next/navigation";
import LanguageModal from "@/components/Language";


interface SettingsDropdownProps {
  selectedLang: string;
  setSelectedLang: React.Dispatch<React.SetStateAction<string>>;
}

const SettingsDropdown: React.FC<SettingsDropdownProps> = ({
  selectedLang,
  setSelectedLang,
}) => {
  const [openSettings, setOpenSettings] = useState(false);
  const [settingsValue, setSettingsValue] = useState<Option | null>(null);
  const [openLanguage, setOpenLanguage] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const translations: Record<string, any> = {
    "en-US": {
      languageLabel: "English (United States)",
      modalTitle: "Language & region of interest",
      modalDesc: "See news from the selected language and region pair",
      searchPlaceholder: "Search for language or region",
      buttons: { cancel: "Cancel", update: "Update" },
      settings: "Settings",
      language: "Language",
    },
    "ru-RU": {
      languageLabel: "Русский (Россия)",
      modalTitle: "Язык и регион",
      modalDesc: "Смотрите новости на выбранном языке и регионе",
      searchPlaceholder: "Поиск языка или региона",
      buttons: { cancel: "Отмена", update: "Обновить" },
      settings: "Настройки",
      language: "Язык",
    },
    "uz-UZ": {
      languageLabel: "O‘zbek (O‘zbekiston)",
      modalTitle: "Til va mintaqa",
      modalDesc: "Tanlangan til va mintaqadagi yangiliklarni ko‘ring",
      searchPlaceholder: "Til yoki mintaqani qidirish",
      buttons: { cancel: "Bekor qilish", update: "Yangilash" },
      settings: "Sozlamalar",
      language: "Til",
    },
    "kz-KZ": {
      languageLabel: "Қазақ (Қазақстан)",
      modalTitle: "Тiл мен аймақ",
      modalDesc: "Таңдалған тіл мен аймақтағы жаңалықтарды қараңыз",
      searchPlaceholder: "Тіл немесе аймақты іздеу",
      buttons: { cancel: "Бас тарту", update: "Жаңарту" },
      settings: "Параметрлер",
      language: "Тiл",
    },
    "in-IN": {
      languageLabel: "Hindi (India)",
      modalTitle: "भाषा और क्षेत्र",
      modalDesc: "चयनित भाषा और क्षेत्र की खबरें देखें",
      searchPlaceholder: "भाषा या क्षेत्र खोजें",
      buttons: { cancel: "रद्द करें", update: "अपडेट करें" },
      settings: "सेटिंग्स",
      language: "भाषा",
    },
    "tr-TR": {
      languageLabel: "Türkçe (Türkiye)",
      modalTitle: "Dil ve bölge",
      modalDesc: "Seçilen dil ve bölgeden haberleri görüntüleyin",
      searchPlaceholder: "Dil veya bölge ara",
      buttons: { cancel: "İptal", update: "Güncelle" },
      settings: "Ayarlar",
      language: "Dil",
    },
    "zh-TW": {
      languageLabel: "中文 (台灣)",
      modalTitle: "語言與地區設定",
      modalDesc: "查看所選語言和地區的新聞",
      searchPlaceholder: "搜尋語言或地區",
      buttons: { cancel: "取消", update: "更新" },
      settings: "設定",
      language: "語言",
    },
  };

  const t = translations[selectedLang];

  const settingsOptions: Option[] = [
    { value: "settings", label: t.settings },
    { value: "language", label: `${t.language} (${t.languageLabel})` },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenSettings(false);
      }
    };

    if (openSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSettings]);

  return (
    <div className={`${cls["icon-help"]} ${cls.hideOnMobile}`} ref={menuRef}>
      <IoSettingsOutline
        className={cls.icon}
        onClick={() => setOpenSettings(!openSettings)}
      />
      {openSettings && (
        <div className={cls.dropdown}>
          {settingsOptions.map((opt) => (
            <div
              key={opt.value}
              className={`${cls["dropdown-item"]} ${
                settingsValue?.value === opt.value ? cls.active : ""
              }`}
              onClick={() => {
                setSettingsValue(opt);
                setOpenSettings(false);

                if (opt.value === "settings") {
                  router.push("/settings");
                }

                if (opt.value === "language") {
                  setOpenLanguage(true);
                }
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}

      {openLanguage && (
        <LanguageModal
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
          setOpenLanguage={setOpenLanguage}
          translations={translations}
        />
      )}
    </div>
  );
};

export default SettingsDropdown;
