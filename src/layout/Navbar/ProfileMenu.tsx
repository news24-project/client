"use client";
import React, { useState, useRef, useEffect } from "react";
import cls from "./Navbar.module.css";
import { IoIosCamera } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import Avatar from "../Avatar";
import { useLanguage } from "@/app/LanguageProvider";
import { translations } from "@/app/translation";
import { useUser } from "@/hooks/useUsers";
import { useDispatch } from "react-redux";
import { addUserData, clearUserData } from "@/redux/reducers/userSlice";

const ProfileMenu: React.FC = () => {
  const { selectedLang } = useLanguage();
  const [openProfile, setOpenProfile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = translations[selectedLang].profileMenu;
  const dispatch = useDispatch();

  const { data: user, isLoading, isError } = useUser();
  console.log(user);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(
        addUserData({
          id: user.id,
          email: user.email,
          image: user.image,
          name: user.name,
          bookmarks: user.bookmarks,
        })
      );
    } else {
      dispatch(clearUserData());
    }
  }, [user, dispatch]);

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

  if (isLoading) <p>Загрузка...</p>;
  if (isError) <p>Error</p>;

  return user ? (
    <div className={cls.relative} ref={menuRef}>
      <div onClick={() => setOpenProfile(!openProfile)}>
        <Avatar
          name={user?.name || ""}
          style={{ width: "30px", height: "30px", cursor: "pointer" }}
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
            <p>
              {t.greeting}, {user.name}!
            </p>
          </div>

          <button className={cls["manage-button"]}>{t.manageAccount}</button>

          <div className={cls["profile-actions"]}>
            <button className={cls["add-account"]}>
              <span className={cls["button-icon"]}>
                <IoAddOutline />
              </span>
              {t.addAccount}
            </button>
            <button className={cls["sign-out"]}>
              <span className={cls["button-icon"]}>
                <FiLogOut />
              </span>
              {t.signOut}
            </button>
          </div>

          <div className={cls["popup-footer"]}>
            <Link href="#">{t.privacy}</Link>
            <p>-</p>
            <Link href="#">{t.terms}</Link>
          </div>
        </div>
      )}
    </div>
  ) : (
    <>
      <Link
        className={cls["login"]}
        href="http://localhost:4000/api/users/google"
      >
        Sign in
      </Link>
    </>
  );
};

export default ProfileMenu;
