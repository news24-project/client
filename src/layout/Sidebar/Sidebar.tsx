"use client";
import React, { useState } from "react";
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

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const [openLanguage, setOpenLanguage] = useState(false);
  const { selectedLang, setSelectedLang } = useLanguage();
  const t = translations[selectedLang]?.sidebar; // tarjimalar
  const router = useRouter();

  const categories = [
    { label: t?.home, icon: <FaHome /> },
    { label: t?.following, icon: <FaStar /> },
    { label: t?.saved, icon: <FaSearch /> },
    { label: t?.us, icon: <MdOutlinedFlag /> },
    { label: t?.world, icon: <MdPublic /> },
    { label: t?.local, icon: <LuMapPin /> },
    { label: t?.business, icon: <MdBusiness /> },
    { label: t?.technology, icon: <SiCreativetechnology /> },
    { label: t?.entertainment, icon: <GiFilmSpool /> },
    { label: t?.sports, icon: <GiCycling /> },
    { label: t?.science, icon: <MdOutlineScience /> },
    { label: t?.health, icon: <MdScience /> },
    { label: t?.language },
    { label: t?.settings },
    { label: t?.android },
    { label: t?.feedback },
    { label: t?.help },
  ];

  return (
    <>
      <div className={`${cls.sidebar} ${sidebarOpen ? cls.open : ""}`}>
        <ul className={cls["sidebar-list"]}>
          {categories.map((cat, i) => (
            <React.Fragment key={i}>
              {/* separator */}
              {(i === 3 || i === 12) && (
                <hr className={cls["sidebar-divider"]} />
              )}
              <li
                className={cls["sidebar-item"]}
                onClick={() => {
                  if (cat.label === t?.language) {
                    setOpenLanguage(true);
                  } else if (cat.label === t?.settings) {
                    router.push("/settings");
                  }
                  toggleSidebar();
                }}
              >
                <span className={cls["sidebar-icon"]}>{cat.icon}</span>
                <span className={cls["sidebar-label"]}>{cat.label}</span>
              </li>
            </React.Fragment>
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
