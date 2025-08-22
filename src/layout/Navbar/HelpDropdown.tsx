"use client";
import React, { useState, useRef, useEffect } from "react";
import cls from "./Navbar.module.css";
import { FaRegQuestionCircle } from "react-icons/fa";

interface HelpDropdownProps {
  selectedLang: string;
}

interface HelpOption {
  value: string;
  label: string;
  url: string;
}

const translations: Record<string, Record<string, string>> = {
  "en-US": {
    help: "Help",
    privacy: "Privacy",
    terms: "Terms",
    about: "About Google",
    android: "Get the Android app",
    ios: "Get the iOS app",
    feedback: "Send feedback",
  },
  "ru-RU": {
    help: "Помощь",
    privacy: "Конфиденциальность",
    terms: "Условия",
    about: "О Google",
    android: "Скачать Android-приложение",
    ios: "Скачать iOS-приложение",
    feedback: "Отправить отзыв",
  },
  "zh-TW": {
    help: "幫助",
    privacy: "隱私權",
    terms: "條款",
    about: "關於 Google",
    android: "取得 Android 應用程式",
    ios: "取得 iOS 應用程式",
    feedback: "發送意見回饋",
  },
  "uz-UZ": {
    help: "Yordam",
    privacy: "Maxfiylik",
    terms: "Qoidalar",
    about: "Google haqida",
    android: "Android ilovasini yuklab olish",
    ios: "iOS ilovasini yuklab olish",
    feedback: "Fikr bildirish",
  },
  "kz-KZ": {
    help: "Көмек",
    privacy: "Құпиялық",
    terms: "Ережелер",
    about: "Google туралы",
    android: "Android қолданбасын алу",
    ios: "iOS қолданбасын алу",
    feedback: "Пікір жіберу",
  },
  "in-IN": {
    help: "सहायता",
    privacy: "गोपनीयता",
    terms: "शर्तें",
    about: "Google के बारे में",
    android: "Android ऐप प्राप्त करें",
    ios: "iOS ऐप प्राप्त करें",
    feedback: "प्रतिक्रिया भेजें",
  },
  "tr-TR": {
    help: "Yardım",
    privacy: "Gizlilik",
    terms: "Şartlar",
    about: "Google Hakkında",
    android: "Android uygulamasını alın",
    ios: "iOS uygulamasını alın",
    feedback: "Geri bildirim gönder",
  },
};

const HelpDropdown: React.FC<HelpDropdownProps> = ({ selectedLang }) => {
  const [openHelp, setOpenHelp] = useState(false);
  const [helpValue, setHelpValue] = useState<HelpOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[selectedLang] || translations["en-US"];

  const helpOptions: HelpOption[] = [
    { value: "help", label: t.help, url: "https://support.google.com" },
    { value: "privacy", label: t.privacy, url: "https://policies.google.com/privacy" },
    { value: "terms", label: t.terms, url: "https://policies.google.com/terms" },
    { value: "about", label: t.about, url: "https://about.google" },
    { value: "android", label: t.android, url: "https://play.google.com" },
    { value: "ios", label: t.ios, url: "https://apps.apple.com" },
    { value: "feedback", label: t.feedback, url: "https://support.google.com/feedback" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenHelp(false);
      }
    };

    if (openHelp) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openHelp]);

  return (
    <div className={`${cls["icon-help"]} ${cls.hideOnMobile}`} ref={dropdownRef}>
      <FaRegQuestionCircle
        className={cls.icon}
        onClick={() => setOpenHelp(!openHelp)}
      />
      {openHelp && (
        <div className={cls.dropdown}>
          {helpOptions.map((opt) => (
            <div
              key={opt.value}
              className={`${cls["dropdown-item"]} ${
                helpValue?.value === opt.value ? cls.active : ""
              }`}
              onClick={() => {
                setHelpValue(opt);
                setOpenHelp(false);
                window.open(opt.url, "_blank");
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpDropdown;
