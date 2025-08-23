"use client";
import React, { useState, useRef, useEffect } from "react";
import cls from "./Navbar.module.css";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Option } from "@/types";

const HelpDropdown = () => {
  const [openHelp, setOpenHelp] = useState(false);
  const [helpValue, setHelpValue] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const helpOptions: Option[] = [
    { value: "help", label: "Help" },
    { value: "privacy", label: "Privacy" },
    { value: "terms", label: "Terms" },
    { value: "about", label: "About Google" },
    { value: "android", label: "Get the Android app" },
    { value: "ios", label: "Get the iOS app" },
    { value: "feedback", label: "Send feedback" },
  ];

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenHelp(false);
      }
    };

    if (openHelp) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openHelp]);

  return (
    <div className={`${cls["icon-help"]} ${cls.hideOnMobile}`} ref={dropdownRef}>
      <FaRegQuestionCircle
        className={cls.icon}
        onClick={() => setOpenHelp(!openHelp)}
      />
      {openHelp && (
        <div className={cls.dropdown}>
          {helpOptions.map((opt) => (
            <div
              key={opt.value}
              className={`${cls["dropdown-item"]} ${
                helpValue?.value === opt.value ? cls.active : ""
              }`}
              onClick={() => {
                setHelpValue(opt);
                setOpenHelp(false);
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

export default HelpDropdown;
