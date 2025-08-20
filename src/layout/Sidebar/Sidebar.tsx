"use client";
import React from "react";
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

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const categories = [
    { label: "Home", icon: <FaHome /> },
    { label: "Following", icon: <FaStar /> },
    { label: "Saved searches", icon: <FaSearch /> },
    { label: "U.S.", icon: <MdOutlinedFlag /> },
    { label: "World", icon: <MdPublic /> },
    { label: "Your local news", icon: <LuMapPin /> },
    { label: "Business", icon: <MdBusiness /> },
    { label: "Technology", icon: <SiCreativetechnology /> },
    { label: "Entertainment", icon: <GiFilmSpool /> },
    { label: "Sports", icon: <GiCycling /> },
    { label: "Science", icon: <MdOutlineScience /> },
    { label: "Health", icon: <MdScience /> },
    { label: "Language & region" },
   
  ];

  return (
    <div className={`${cls.sidebar} ${sidebarOpen ? cls.open : ""}`}>
      <ul className={cls["sidebar-list"]}>
        {categories.map((cat, i) => (
          <React.Fragment key={i}>
            {(i === 3 || i === 12) && <hr className={cls["sidebar-divider"]} />}
            <li className={cls["sidebar-item"]}>
              <span className={cls["sidebar-icon"]}>{cat.icon}</span>
              <span className={cls["sidebar-label"]}>{cat.label}</span>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
