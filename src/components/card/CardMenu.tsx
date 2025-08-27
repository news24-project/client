"use client";
import React from "react";
import Link from "next/link";
import cn from "classnames";
import css from "./CardMenu.module.css";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/reducers/modalSlice";

// icons
import ThreeMenuIcon from "../../../public/icons/cardComponent/ThreeMenu";
import SaveIcon from "../../../public/icons/cardComponent/Save";
import ShareIcon from "../../../public/icons/cardComponent/Share";
import LinkIcon from "../../../public/icons/cardComponent/Link";
import LikeIcon from "../../../public/icons/cardComponent/Like";
import DisLikeIcon from "../../../public/icons/cardComponent/DisLike";

type Props = {
  url: string;
  title: string;
  author?: string;
  iconUrl: string;
};

const CardMenu = ({ url, title, author }: Props) => {
  const [isActive, setIsActive] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    }
    if (isActive) window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isActive]);

  const handleMenuClick = () => setIsActive(false);

  const handleShare = () => {
    dispatch(openModal());
    setIsActive(false);
  };

  return (
    <div ref={menuRef} className={cn(css.wrapper)}>
      <article
        className={cn(css.menuIcon)}
        onClick={() => setIsActive((p) => !p)}
      >
        <ThreeMenuIcon />
      </article>

      <div className={cn(css.menuWrapper, { [css.menuActive]: isActive })}>
        <ul>
          <li className={cn(css.menuItem)} onClick={handleMenuClick}>
            <Link href="/#">
              <div><SaveIcon /></div>
              <span>Save for later</span>
            </Link>
          </li>

          <li className={cn(css.menuItem)} onClick={handleShare}>
            <div><ShareIcon /></div>
            <span>Share</span>
          </li>

          {author && (
            <li className={cn(css.menuItem)} onClick={handleMenuClick}>
              <Link href={url} target="_blank" rel="noopener noreferrer">
                <div><LinkIcon /></div>
                <span>Read more by {author}</span>
              </Link>
            </li>
          )}

          <li className={cn(css.menuItem)} onClick={handleMenuClick}>
            <Link href="/#">
              <div><LikeIcon /></div>
              <span>More stories like this</span>
            </Link>
          </li>

          <li className={cn(css.menuItem)} onClick={handleMenuClick}>
            <Link href="/#">
              <div><DisLikeIcon /></div>
              <span>Fewer stories like this</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardMenu;
