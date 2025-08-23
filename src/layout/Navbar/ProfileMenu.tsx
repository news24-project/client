"use client";
import React, { useState, useRef, useEffect } from "react";
import cls from "./Navbar.module.css";

import { IoIosCamera } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import Avatar from "../Avatar";

const ProfileMenu = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const user = {
    name: "nurken",
    email: "nurkenqaldybaev2001@gmail.com",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenProfile(false);
      }
    };

    if (openProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openProfile]);

  return (
    <div className={cls.relative} ref={menuRef}>
      <div onClick={() => setOpenProfile(!openProfile)}>
        <Avatar
          name={user.name}
          style={{ width: "28px", height: "28px", cursor: "pointer" }}
        />
      </div>

      {openProfile && (
        <div className={cls["profile-popup"]}>
          <span
            className={cls["close-btn"]}
            onClick={() => setOpenProfile(false)}
          >
            &times;
          </span>
          <p style={{ textAlign: "center" }}>{user.email}</p>

          <div className={cls["user-avatar"]}>
            <Avatar
              name={user.name}
              style={{
                width: "64px",
                height: "64px",
              }}
            />
            <IoIosCamera className={cls["cam-icon"]} />
            <p>Hi, {user.name}!</p>
          </div>

          <button className={cls["manage-button"]}>
            Manage your Google Account
          </button>

          <div className={cls["profile-actions"]}>
            <button className={cls["add-account"]}>
              <span className={cls["button-icon"]}>
                <IoAddOutline />
              </span>
              Add account
            </button>
            <button className={cls["sign-out"]}>
              <span className={cls["button-icon"]}>
                <FiLogOut />
              </span>
              Sign out
            </button>
          </div>

          <div className={cls["popup-footer"]}>
            <Link href="#">Privacy Policy</Link>
            <p>-</p>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
