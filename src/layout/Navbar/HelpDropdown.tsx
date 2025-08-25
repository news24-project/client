"use client";
import React, { useState, useRef, useEffect } from "react";
import cls from "./Navbar.module.css";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useLanguage } from "@/app/LanguageProvider";
import { translations } from "@/app/translation";

interface HelpOption {
  value: string;
  label: string;
  url: string;
}

const HelpDropdown: React.FC = () => {
  const { selectedLang } = useLanguage();
  const [openHelp, setOpenHelp] = useState(false);
  const [helpValue, setHelpValue] = useState<HelpOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[selectedLang].helpDropdown || translations["en-US"].helpDropdown;

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
