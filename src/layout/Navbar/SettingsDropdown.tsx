"use client";
import React, { useState, useRef, useEffect } from "react";
import cls from "./Navbar.module.css";
import { IoSettingsOutline } from "react-icons/io5";
import { Option } from "@/types";

const SettingsDropdown = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const [settingsValue, setSettingsValue] = useState<Option | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const settingsOptions: Option[] = [
    { value: "settings", label: "Settings" },
    { value: "language", label: "Language" },
  ];

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenSettings(false);
      }
    };

    if (openSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSettings]);

  return (
    <div className={`${cls["icon-help"]} ${cls.hideOnMobile}`} ref={menuRef}>
      <IoSettingsOutline
        className={cls.icon}
        onClick={() => setOpenSettings(!openSettings)}
      />
      {openSettings && (
        <div className={cls.dropdown}>
          {settingsOptions.map((opt) => (
            <div
              key={opt.value}
              className={`${cls["dropdown-item"]} ${
                settingsValue?.value === opt.value ? cls.active : ""
              }`}
              onClick={() => {
                setSettingsValue(opt);
                setOpenSettings(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
