"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type Language =
  | "en-US"
  | "ru-RU"
  | "uz-UZ"
  | "kz-KZ"
  | "in-IN"
  | "tr-TR"
  | "zh-TW"
  | "ky-KG";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (savedLang) {
      setSelectedLangState(savedLang);
    }
    setLoading(false);
  }, []);

  const setSelectedLang = (lang: Language) => {
    setSelectedLangState(lang);
    localStorage.setItem(STORAGE_KEY, lang);

 
    window.location.href = `/?lang=${lang}`;
  };

  if (loading) {
    return null; 
  }

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
