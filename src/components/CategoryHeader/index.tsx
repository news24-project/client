"use client";

import React, { useState } from "react";
import cls from "./CategoryHeader.module.css";
import { BsShare } from "react-icons/bs";
import { IoIosStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";

type Props = {
  title: string;
  icon?: React.ReactNode;
  categories: string[];
};

const CategoryHeader = ({ title, icon = "💡", categories }: Props) => {
  const [active, setActive] = useState(categories[0]);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className={cls.categoryHeader}>
      <div className={cls.titleSection}>
        <div className={cls.flex}>
          <div className={cls.icon}>{icon}</div>
          <h1>{title}</h1>
        </div>
        <div className={cls.followShare}>
          <button
            onClick={handleFollow}
            className={`${cls.follow} ${isFollowing ? cls.following : ""}`}
          >
            {isFollowing ? (
              <IoStar className={cls["follow-icon"]} />
            ) : (
              <IoIosStarOutline className={cls["follow-icon"]} />
            )}
            {isFollowing ? "Following" : "Follow"}
          </button>
          <button className={cls.share}>
            <BsShare />
          </button>
        </div>
      </div>

      <div className={cls.buttons}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${cls.button} ${active === cat ? cls.active : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryHeader;
