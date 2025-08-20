"use client";
import React from "react";
import cls from "./Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLinks = () => {
  const pathname = usePathname();

  const categories: ({ name: string; path: string } | "|") [] = [
    { name: "Home", path: "/" },
    { name: "For you", path: "/foryou" },
    { name: "Following", path: "/following" },
    "|",
    { name: "U.S.", path: "/us" },
    { name: "World", path: "/world" },
    { name: "Local", path: "/local" },
    { name: "Business", path: "/business" },
    { name: "Technology", path: "/technology" },
    { name: "Sports", path: "/sports" },
    { name: "Entertainment", path: "/entertainment" },
    { name: "Science", path: "/science" },
    { name: "Health", path: "/health" },
  ];

  return (
    <div className={cls["navbar-links"]}>
      {categories.map((category, index) =>
        category === "|" ? (
          <span key={index} className={cls["hide-mobile"]}>
            |
          </span>
        ) : (
          <Link
            key={index}
            href={category.path}
            className={`${pathname === category.path ? cls.active : ""} ${
              category.name === "Home" || category.name === "Following"
                ? cls["hide-mobile"]
                : ""
            }`}
          >
            {category.name}
          </Link>
        )
      )}
    </div>
  );
};

export default NavbarLinks;
