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

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [selectedLang, setSelectedLang] = useState("en-US");

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className={cls["navbar-wrapper"]}>
      <div className={cls["navbar-top"]}>
        <MdMenu className={cls["icon-menu"]} onClick={toggleSidebar} />
        <h1 className={cls["title"]}>News24</h1>

        <div className={cls["navbar-center"]}>
          <SearchBar selectedLang={selectedLang} />
          <HelpDropdown selectedLang={selectedLang} />
          <SettingsDropdown
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
          />
        </div>

        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          selectedLang={selectedLang} // ❗
          setSelectedLang={setSelectedLang} // ❗
        />

        <div className={cls["navbar-flex"]}>
          <AppsMenu selectedLang={selectedLang} />
          <ProfileMenu selectedLang={selectedLang} />
        </div>
      </div>
      <div className="container">
        <NavbarLinks selectedLang={selectedLang} />
      </div>
    </div>
  );
};

export default Navbar;
