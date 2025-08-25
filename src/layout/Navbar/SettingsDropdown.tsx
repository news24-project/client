"use client";
import React, { useState, useRef, useEffect } from "react";
import cls from "./Navbar.module.css";
import { IoSettingsOutline } from "react-icons/io5";
import { Option } from "@/types";
import { useRouter } from "next/navigation";
import LanguageModal from "@/components/Language";
import { useLanguage } from "@/app/LanguageProvider";
import { translations } from "@/app/translation";

const SettingsDropdown = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const [settingsValue, setSettingsValue] = useState<Option | null>(null);
  const [openLanguage, setOpenLanguage] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { selectedLang, setSelectedLang } = useLanguage();

  const t = translations[selectedLang].settingsDropdown;

  const langLabel = translations[selectedLang].languageModal.languageLabel;

  const settingsOptions: Option[] = [
    { value: "settings", label: t.settings },
    { value: "language", label: `${t.language} (${langLabel})` },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenSettings(false);
      }
    };
    if (openSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
                if (opt.value === "settings") router.push("/settings");
                if (opt.value === "language") setOpenLanguage(true);
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
