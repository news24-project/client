"use client";
import React from "react";
import cls from "./Language.module.css";
import { IoIosSearch } from "react-icons/io";

type Language =
  | "en-US"
  | "ru-RU"
  | "uz-UZ"
  | "kz-KZ"
  | "in-IN"
  | "tr-TR"
  | "zh-TW"
  | "ky-KG";

interface LanguageModalProps {
  selectedLang: Language;
  setSelectedLang: (lang: Language) => void;
  setOpenLanguage: (open: boolean) => void;
  translations: Record<Language, any>;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
  selectedLang,
  setSelectedLang,
  setOpenLanguage,
  translations,
}) => {
  const [tempLang, setTempLang] = React.useState<Language>(selectedLang);
  const t = translations[selectedLang];

  return (
    <div className={cls.overlay}>
      <div className={cls.modal}>
        <h3 className={cls["modal-title"]}>{t.languageModal.modalTitle}</h3>
        <p className={cls["modal-desc"]}>{t.languageModal.modalDesc}</p>

        <div className={cls["modal-input"]}>
          <input
            type="search"
            placeholder={t.languageModal.searchPlaceholder}
            className={cls.search}
          />
          <IoIosSearch className={cls["input-icon"]} />
        </div>

        <div className={cls.options}>
          {(Object.keys(translations) as Language[]).map((lang) => (
            <label key={lang} className={cls.optionLabel}>
              <input
                type="radio"
                name="lang"
                value={lang}
                checked={tempLang === lang}
                onChange={() => setTempLang(lang)}
              />
              {translations[lang].languageModal.languageLabel}
            </label>
          ))}
        </div>

        <div className={cls.actions}>
          <button onClick={() => setOpenLanguage(false)}>
            {t.languageModal.buttons.cancel}
          </button>
          <button
            onClick={() => {
              setSelectedLang(tempLang);
              setOpenLanguage(false);

              const searchParams = new URLSearchParams(window.location.search);
              searchParams.set("lang", tempLang);
              const newUrl = `${
                window.location.pathname
              }?${searchParams.toString()}`;
              window.history.replaceState(null, "", newUrl);

              console.log("Language updated:", tempLang);
            }}
          >
            {t.languageModal.buttons.update}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
