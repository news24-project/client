"use client";
import React from "react";
import cls from "./Language.module.css";
import { IoIosSearch } from "react-icons/io";

interface LanguageModalProps {
  selectedLang: string;
  setSelectedLang: React.Dispatch<React.SetStateAction<string>>;
  setOpenLanguage: React.Dispatch<React.SetStateAction<boolean>>;
  translations: Record<string, any>;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
  selectedLang,
  setSelectedLang,
  setOpenLanguage,
  translations,
}) => {
  const [tempLang, setTempLang] = React.useState(selectedLang);
  const t = translations[selectedLang];

  return (
    <div className={cls.overlay}>
      <div className={cls.modal}>
        <h3 className={cls["modal-title"]}>{t.modalTitle}</h3>
        <p className={cls["modal-desc"]}>{t.modalDesc}</p>

        <div className={cls["modal-input"]}>
          <input
            type="search"
            placeholder={t.searchPlaceholder}
            className={cls.search}
          />
          <IoIosSearch className={cls["input-icon"]} />
        </div>

        <div className={cls.options}>
          {Object.keys(translations).map((lang) => (
            <label key={lang}>
              <input
                type="radio"
                name="lang"
                checked={tempLang === lang}
                onChange={() => setTempLang(lang)}
              />
              {translations[lang].languageLabel}
            </label>
          ))}
        </div>

        <div className={cls.actions}>
          <button onClick={() => setOpenLanguage(false)}>{t.buttons.cancel}</button>
          <button
            onClick={() => {
              setSelectedLang(tempLang);
              setOpenLanguage(false);
              console.log("Language updated:", tempLang);
            }}
          >
            {t.buttons.update}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
