"use client";

import Image from "next/image";
import { useLanguage } from "../LanguageProvider";


export default function NotFound() {
  const { selectedLang } = useLanguage();


  const translations: Record<string, string> = {
    "en-US": "There are no items to show.",
    "ru-RU": "Нет элементов для отображения.",
    "uz-UZ": "Ko‘rsatish uchun elementlar yo‘q.",
    "kz-KZ": "Көрсететін элементтер жоқ.",
    "in-IN": "दिखाने के लिए कोई आइटम नहीं हैं।",
    "tr-TR": "Gösterilecek öğe yok.",
    "zh-TW": "沒有可顯示的項目。",
    "ky-KG": "Көрсөтө турган элементтер жок.",
  };

  const text = translations[selectedLang] || translations["en-US"];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div style={{ marginTop: "20px" }}>
        <Image
          src="/images/not-found.webp"
          alt="Not Found"
          width={200}
          height={200}
        />
      </div>
      <p style={{ marginTop: "15px", fontSize: "18px", color: "#bdc1c6" }}>
        {text}
      </p>
    </div>
  );
}
