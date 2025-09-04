"use client";

import React, { useState } from "react";
import cls from "./CategoryHeader.module.css";
import { BsShare } from "react-icons/bs";
import { IoIosStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";

type Props = {
  title: string;
  image?: string;
  categories?: string[];
  activeIndex?: number;
  onTagClick?: (index: number) => void;
  backgroundColor?: string;
};

const CategoryHeader = ({
  title,
  image,
  categories = [],
  activeIndex = 0,
  onTagClick,
  backgroundColor,
}: Props) => {
const fullCategories =
  title.toLowerCase() === "world"
    ? [] 
    : categories && categories.length > 0
    ? ["Latest", ...categories]
    : [];



  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className={cls.categoryHeader}>
      <div className={cls.titleSection}>
        <div className={cls.flex}>
          <div
            className={cls.iconWrapper}
            style={{ backgroundColor: backgroundColor }}
          >
            {image && (
              <img src={image} alt="category icon" className={cls.icon} />
            )}
          </div>
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
        {fullCategories.map((cat, idx) => (
          <button
            key={`${cat}-${idx}`}
            className={`${cls.button} ${activeIndex === idx ? cls.active : ""}`}
            onClick={() => onTagClick?.(idx)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryHeader;
