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

  const t =
    translations[selectedLang].navbarLinks || translations["en-US"].navbarLinks;

  const staticCategories: CategoryType[] = [
    { name: t.home, path: "/" },
    { name: t.forYou, path: "/foryou" },
    { name: t.following, path: "/following" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories([]);
      try {
        const { data } = await customAxios.get(
          `/categories?lang=${selectedLang}`
        );

        const mapped = (data.categories || []).map((cat: any) => {
          const path = `/${cat.slug}${cat.id ? `?id=${cat.id}` : ""}`;
          return {
            name: cat.name,
            path,
          };
        });

        const dynamicCats: CategoryType[] = [...mapped];

        if (data?.country) {
          const countryPath = `/country/${data.country.slug}?lang=${selectedLang}`;
          dynamicCats.unshift({
            name: data.country.name,
            path: countryPath,
          });
        }

        setCategories([...staticCategories, ...dynamicCats]);
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
            className={`${
              pathname.split("?")[0] === cat.path.split("?")[0]
                ? cls.active
                : ""
            } ${
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
