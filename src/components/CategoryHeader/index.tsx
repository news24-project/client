"use client";

import React, { useEffect, useState } from "react";
import cls from "./CategoryHeader.module.css";
import { BsShare } from "react-icons/bs";
import { IoIosStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import {
  useFollowMutation,
  useGetAllFollows,
  useUnFollowMutation,
} from "@/hooks/useFollow";

type Props = {
  title: string;
  icon?: React.ReactNode;
  categories?: string[];
  activeIndex?: number;
  onTagClick?: (index: number) => void;
  id: string;
};

const CategoryHeader = ({
  title,
  icon = "💡",
  categories = [],
  activeIndex = 0,
  onTagClick,
  id,
}: Props) => {
  const fullCategories = ["All", ...categories];
  const { data } = useGetAllFollows();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const alreadyFollowing = data?.data?.some(
      (item: any) => item.categoryId === id
    );
    setIsFollowing(alreadyFollowing ?? false);
  }, [data, id]);

  const followUser = useFollowMutation();
  const unfollow = useUnFollowMutation();

  const handleFollow = () => {
    if (isFollowing) {
      unfollow.mutate(id);
      setIsFollowing(false);
    } else {
      followUser.mutate({ categoryId: id });
      setIsFollowing(true);
    }
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
        {fullCategories.map((cat, idx) => (
          <button
            key={cat}
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
