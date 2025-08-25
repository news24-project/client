"use client";
import React, { useState } from "react";
import cls from "./Navbar.module.css";
import SearchBar from "./SearchBar";
import HelpDropdown from "./HelpDropdown";
import SettingsDropdown from "./SettingsDropdown";
import AppsMenu from "./AppsMenu";
import ProfileMenu from "./ProfileMenu";
import { MdMenu } from "react-icons/md";
import Sidebar from "../Sidebar/Sidebar";
import NavbarLinks from "./NavbarLinks";
import { useLanguage } from "@/app/LanguageProvider";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { selectedLang, setSelectedLang } = useLanguage(); 

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className={cls["navbar-wrapper"]}>
      <div className={cls["navbar-top"]}>
        <MdMenu className={cls["icon-menu"]} onClick={toggleSidebar} />
        <h1 className={cls["title"]}>News24</h1>
        <div className={cls["navbar-center"]}>
          <SearchBar />
          <HelpDropdown  />
          <SettingsDropdown /> 
        </div>

        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        <div className={cls["navbar-flex"]}>
          <AppsMenu  />
          <ProfileMenu  />
        </div>
      </div>
      <div className="container">
        <NavbarLinks  />
      </div>
    </div>
  );
};

export default Navbar;
