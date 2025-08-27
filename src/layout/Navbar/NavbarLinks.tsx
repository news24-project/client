"use client";
import React, { useEffect, useState } from "react";
import cls from "./Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CategoryType } from "@/types";
import { customAxios } from "@/api/customAxios";
import { useLanguage } from "@/app/LanguageProvider";
import { translations } from "@/app/translation";

const NavbarLinks: React.FC = () => {
  const { selectedLang } = useLanguage();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const pathname = usePathname();

  const t = translations[selectedLang].navbarLinks || translations["en-US"].navbarLinks;

  const staticCategories: CategoryType[] = [
    { name: t.home, path: "/" },
    { name: t.forYou, path: "/foryou" },
    { name: t.following, path: "/following" },
    { name: t.local, path: "/local" },
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
              [t.home, t.following].includes(cat.name) ? cls["hide-mobile"] : ""
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
