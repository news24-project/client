"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Language =
  | "en-US"
  | "ru-RU"
  | "uz-UZ"
  | "kz-KZ"
  | "in-IN"
  | "tr-TR"
  | "zh-TW";

interface LanguageContextType {
  selectedLang: Language;
  setSelectedLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const STORAGE_KEY = "selectedLang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLang, setSelectedLangState] = useState<Language>("en-US");

  useEffect(() => {
    const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (savedLang) {
      setSelectedLangState(savedLang);
    }
  }, []);

  const setSelectedLang = (lang: Language) => {
    setSelectedLangState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  return (
    <LanguageContext.Provider value={{ selectedLang, setSelectedLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
