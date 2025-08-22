"use client";
import React, { useEffect, useState } from "react";
import cls from "./Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CategoryType } from "@/types";
import { customAxios } from "@/api/customAxios";

interface NavbarLinksProps {
  selectedLang: string;
}

const translations: Record<string, { home: string; forYou: string; following: string }> = {
  "en-US": { home: "Home", forYou: "For you", following: "Following" },
  "ru-RU": { home: "Главная", forYou: "Для вас", following: "Подписки" },
  "zh-TW": { home: "首頁", forYou: "為你推薦", following: "關注" },
  "uz-UZ": { home: "Bosh sahifa", forYou: "Siz uchun", following: "Obunalar" },
  "kz-KZ": { home: "Басты бет", forYou: "Сіз үшін", following: "Жазылымдар" },
  "in-IN": { home: "होम", forYou: "आपके लिए", following: "अनुसरण" },
  "tr-TR": { home: "Ana Sayfa", forYou: "Senin için", following: "Takipler" },
};

const NavbarLinks: React.FC<NavbarLinksProps> = ({ selectedLang }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const pathname = usePathname();

  const t = translations[selectedLang] || translations["en-US"];

  const staticCategories: CategoryType[] = [
    { name: t.home, path: "/" },
    { name: t.forYou, path: "/foryou" },
    { name: t.following, path: "/following" },
  ];

  const toSlug = (name: string) =>
    "/" +
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await customAxios.get<CategoryType[]>("/categories");
        const mapped = data.map((cat) => ({
          name: cat.name,
          path: toSlug(cat.name),
        }));
        setCategories([...staticCategories, ...mapped]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories(staticCategories);
      }
    };
    fetchCategories();
  }, [selectedLang]);

  return (
    <div className={cls["navbar-links"]}>
      {categories.map((cat, index) => (
        <React.Fragment key={index}>
          <Link
            href={cat.path}
            className={`${pathname === cat.path ? cls.active : ""} ${
              cat.name === t.home || cat.name === t.following
                ? cls["hide-mobile"]
                : ""
            }`}
          >
            {cat.name}
          </Link>

          {index === staticCategories.length - 1 && (
            <span className={cls["hide-mobile"]}>|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default NavbarLinks;
