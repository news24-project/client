"use client";
import React, { useState, useEffect, JSX } from "react";
import cls from "./Sidebar.module.css";
import { FaHome, FaStar, FaSearch } from "react-icons/fa";
import {
  MdPublic,
  MdBusiness,
  MdScience,
  MdOutlinedFlag,
  MdOutlineScience,
} from "react-icons/md";
import { GiFilmSpool, GiCycling } from "react-icons/gi";
import { SiCreativetechnology } from "react-icons/si";
import { LuMapPin } from "react-icons/lu";
import { useRouter } from "next/navigation";
import LanguageModal from "@/components/Language";
import { useLanguage } from "@/app/LanguageProvider";
import { translations } from "@/app/translation";
import { customAxios } from "@/api/customAxios";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const [openLanguage, setOpenLanguage] = useState(false);
  const { selectedLang, setSelectedLang } = useLanguage();
  const [dynamicCategories, setDynamicCategories] = useState<any[]>([]);
  const t = translations[selectedLang]?.sidebar;
  const router = useRouter();

  const categoryIcons: Record<string, JSX.Element> = {
    world: <MdPublic />,
    business: <MdBusiness />,
    science: <MdOutlineScience />,
    entertainment: <GiFilmSpool />,
    sports: <GiCycling />,
    technology: <SiCreativetechnology />,
    health: <MdScience />,
    us: <MdOutlinedFlag />,
    local: <LuMapPin />,
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await customAxios.get(
          `/categories?lang=${selectedLang}`
        );

        const mapped = (data.categories || []).map((cat: any) => ({
          label: cat.name,
          path: `/${cat.slug}?id=${cat.id}`,
          id: cat.id,
          icon: categoryIcons[cat.slug] || <FaSearch />,
        }));

        setDynamicCategories(mapped);
      } catch (err) {
        console.error("Category fetch error:", err);
      }
    };

    fetchCategories();
  }, [selectedLang]);

  const topCategories = [
    { label: t?.home, icon: <FaHome />, path: "/" },
    { label: t?.following, icon: <FaStar />, path: "/following" },
    { label: t?.saved, icon: <FaSearch />, path: "/saved" },
  ];

  const bottomCategories = [
    { label: t?.settings, path: "/settings" },
    { label: t?.android, path: "/android" },
    { label: t?.feedback, path: "/feedback" },
    { label: t?.help, path: "/help" },
  ];

  return (
    <>
      <div className={`${cls.sidebar} ${sidebarOpen ? cls.open : ""}`}>
        <ul className={cls["sidebar-list"]}>
          {topCategories.map((cat, i) => (
            <li
              key={i}
              className={cls["sidebar-item"]}
              onClick={() => {
                if (cat.path) router.push(cat.path);
                toggleSidebar();
              }}
            >
              {cat.icon && (
                <span className={cls["sidebar-icon"]}>{cat.icon}</span>
              )}
              <span className={cls["sidebar-label"]}>{cat.label}</span>
            </li>
          ))}
            <hr className={cls["sidebar-divider"]} />

          {dynamicCategories.map((cat, i) => (
            <li
              key={`dynamic-${i}`}
              className={cls["sidebar-item"]}
              onClick={() => {
                router.push(cat.path);
                toggleSidebar();
              }}
            >
              {cat.icon && (
                <span className={cls["sidebar-icon"]}>{cat.icon}</span>
              )}
              <span className={cls["sidebar-label"]}>{cat.label}</span>
            </li>
          ))}
            <hr className={cls["sidebar-divider"]} />

          <li
            className={cls["sidebar-item"]}
            onClick={() => {
              setOpenLanguage(true);
              toggleSidebar();
            }}
          >
            <span className={cls["sidebar-label"]}>{t?.language}</span>
          </li>

          {bottomCategories.map((cat, i) => (
            <li
              key={`bottom-${i}`}
              className={cls["sidebar-item"]}
              onClick={() => {
                if (cat.path) router.push(cat.path);
                toggleSidebar();
              }}
            >
              <span className={cls["sidebar-label"]}>{cat.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {openLanguage && (
        <LanguageModal
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
          setOpenLanguage={setOpenLanguage}
          translations={translations}
        />
      )}
    </>
  );
};

export default Sidebar;
