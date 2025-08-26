"use client";
import React from "react";
import Link from "next/link";
import cn from "classnames";
import css from "./CardMenu.module.css";

// icons
import ThreeMenuIcon from "../../../public/icons/cardComponent/ThreeMenu";
import SaveIcon from "../../../public/icons/cardComponent/Save";
import ShareIcon from "../../../public/icons/cardComponent/Share";
import LinkIcon from "../../../public/icons/cardComponent/Link";
import BlockIcon from "../../../public/icons/cardComponent/Block";
import LikeIcon from "../../../public/icons/cardComponent/Like";
import DisLikeIcon from "../../../public/icons/cardComponent/DisLike";

type Props = {
  author?: { id?: string; name?: string };
  organization: { id: string; title: string };
  socials?: { link: string; facebookLink: string; twitterLink: string };
  imgIcon: string;
  imgIconText: string;
  setIsActiveModal: (v: boolean) => void;
};

const CardMenu = ({
  author,
  organization,
  socials,
  imgIcon,
  imgIconText,
  setIsActiveModal,
}: Props) => {
  const [isActive, setIsActive] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    }
    if (isActive) {
      window.addEventListener("mousedown", handleClickOutside);
    }
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isActive]);

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
          <li className={cn(css.menuItem)}>
            <Link href="/#">
              <div>
                <SaveIcon />
              </div>{" "}
              Save for later
            </Link>
          </li>
          <li
            className={cn(css.menuItem)}
            onClick={() => {
              const shareData = {
                imgIcon,
                imgIconText,
                socials,
                description: organization.title,
              };
              sessionStorage.setItem("shareData", JSON.stringify(shareData));
              setIsActive(false);
              setIsActiveModal(true);
            }}
          >
            <div>
              <ShareIcon />
            </div>
            Share
          </li>
          <li className={cn(css.menuItem)}>
            <Link href={organization.id} target="_blank">
              <div>
                <LinkIcon />
              </div>{" "}
              Go to {organization.title}
            </Link>
          </li>
          {author?.id && author.name && (
            <li className={cn(css.menuItem)}>
              <Link href={author.id} target="_blank">
                <div>
                  <LinkIcon />
                </div>{" "}
                Go to {author.name}
              </Link>
            </li>
          )}
          <li className={cn(css.menuItem)}>
            <Link href="/#">
              <div>
                <BlockIcon />
              </div>{" "}
              Hide All stories from {organization.title}
            </Link>
          </li>
          <li className={cn(css.menuItem)}>
            <Link href="/#">
              <div>
                <LikeIcon />
              </div>{" "}
              More stories like this
            </Link>
          </li>
          <li className={cn(css.menuItem)}>
            <Link href="/#">
              <div>
                <DisLikeIcon />
              </div>{" "}
              Fewer stories like this
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardMenu;
