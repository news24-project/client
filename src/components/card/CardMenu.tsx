"use client";
import React from "react";
import Link from "next/link";
import cn from "classnames";
import css from "./CardMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/storeState";
import { openModal } from "@/redux/reducers/modalSlice";
import { useToggleBookmarks } from "@/hooks/useBookmarks";
import toast from "react-hot-toast";

// icons
import ThreeMenuIcon from "../../../public/icons/cardComponent/ThreeMenu";
import SaveIcon from "../../../public/icons/cardComponent/Save";
import ShareIcon from "../../../public/icons/cardComponent/Share";
import LinkIcon from "../../../public/icons/cardComponent/Link";
import LikeIcon from "../../../public/icons/cardComponent/Like";
import DisLikeIcon from "../../../public/icons/cardComponent/DisLike";
import SaveIconActive from "../../../public/icons/cardComponent/SaveActive";

type Props = {
  url: string;
  title: string;
  author?: string;
  iconUrl: string;
  articleId: string;
  isSmallMenu?:boolean;
};

const CardMenu = ({ url, title, author, articleId, iconUrl, isSmallMenu }: Props) => {
  const [isActive, setIsActive] = React.useState(false);
  const [coords, setCoords] = React.useState<{ top: number; left: number } | null>(null);
  const [saved, setSaved] = React.useState(false);

  const menuRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLElement>(null);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { addMutation, removeMutation } = useToggleBookmarks();

  React.useEffect(() => {
    if (user.bookmarks?.some((b: any) => b.articleId === articleId)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [user.bookmarks, articleId]);

  // Закрытие по клику вне
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsActive(false);
      }
    }
    if (isActive) window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isActive]);

  const handleToggle = (e: React.MouseEvent) => {
    if (isActive) {
      setIsActive(false);
      return;
    }

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const menuWidth = 180;
    const menuHeight = 200;
    const margin = 8;

    let top: number;
    let left: number;

    if (rect.bottom + menuHeight + margin > window.innerHeight) {
      top = rect.top - menuHeight - margin;
    } else {
      top = rect.bottom + margin;
    }

    if (rect.left + menuWidth > window.innerWidth) {
      left = rect.right - menuWidth;
    } else {
      left = rect.left;
    }

    setCoords({ top, left });
    setIsActive(true);
  };

  const handleShare = () => {
    dispatch(openModal());
    setIsActive(false);
  };

  const handleSaveToggle = () => {
    if (!user.id) return;

    if (saved) {
      removeMutation.mutate(articleId, {
        onSuccess: () => {
          setSaved(false);
          toast.success("History removed from Following");
        },
        onError: () => {
          toast.error("Failed to remove history");
        },
      });
    } else {
      addMutation.mutate(
        { userId: user.id, articleId },
        {
          onSuccess: () => {
            setSaved(true);
            toast.success("History saved in Following");
          },
          onError: () => {
            toast.error("Failed to save history");
          },
        }
      );
    }

    setIsActive(false);
  };

  return (
    <div>
      <article ref={buttonRef} className={cn(css.menuIcon,{[css.menuIconSmall]: isSmallMenu})} onClick={handleToggle}>
        <ThreeMenuIcon />
      </article>

      {isActive && coords && (
        <div
          ref={menuRef}
          className={cn(css.menuWrapper, css.menuActive)}
          style={{
            position: "fixed",
            top: coords.top,
            left: coords.left,
          }}
        >
          <ul>
            <li className={cn(css.menuItem)} onClick={handleSaveToggle}>
              <div>{saved ? <SaveIconActive /> : <SaveIcon />}</div>
              <span>{saved ? "Saved" : "Save for later"}</span>
            </li>

            <li className={cn(css.menuItem)} onClick={handleShare}>
              <div><ShareIcon /></div>
              <span>Share</span>
            </li>

            {author && (
              <li className={cn(css.menuItem)} onClick={() => setIsActive(false)}>
                <Link href={url} target="_blank" rel="noopener noreferrer">
                  <div><LinkIcon /></div>
                  <span>Read more by {author}</span>
                </Link>
              </li>
            )}

            <li className={cn(css.menuItem)} onClick={() => setIsActive(false)}>
              <Link href="/#">
                <div><LikeIcon /></div>
                <span>More stories like this</span>
              </Link>
            </li>

            <li className={cn(css.menuItem)} onClick={() => setIsActive(false)}>
              <Link href="/#">
                <div><DisLikeIcon /></div>
                <span>Fewer stories like this</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CardMenu;
