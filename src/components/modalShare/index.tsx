import React from "react";
import cn from "classnames";
import css from "./modal.module.css";
import { IModalShare } from "./interfaces";
import XmarkIcon from "../../../public/icons/cardComponent/Xmark";
import Link from "next/link";
import LinkIcon from "../../../public/icons/cardComponent/Link";

const ModalShare = ({
  description,
  imgIcon,
  imgIconText,
  socials,
}: IModalShare) => {
  return (
    <div className={cn(css.modal)}>
      <div className={cn(css.modalBg)}></div>
      <div className={cn(css.modalChief)}>
        <div className={cn(css.modalChiefWrapper)}>
          <div className={cn(css.modalChiefWrapperWrapp)}>
            <img alt={imgIconText} src={imgIcon} />
            {imgIconText}
          </div>
          <div className={cn(css.modalChiefWrapperWrapp)}>
            <XmarkIcon />
          </div>
        </div>
        <h2>{description}</h2>

        <p>Share this via</p>

        <div className={cn(css.modalChiefIconWrapper)}>
          <div className={cn(css.modalChiefIconWrapperWrapp)}>
            <Link href={socials.link}>
              <div className={cn(css.modalChiefIconWrapperWrappIconDiv)}>
                <LinkIcon />
              </div>
            </Link>
          </div>
          <div className={cn(css.modalChiefIconWrapperWrapp)}>
            <Link href={socials.facebookLink}>
              <div className={cn(css.modalChiefIconWrapperWrappIconDiv)}>
                <img alt="facebook" src="/images/cardComponent/facebook.jpg" />
              </div>
            </Link>
          </div>
          <div className={cn(css.modalChiefIconWrapperWrapp)}>
            <Link href={socials.twitterLink}>
              <div className={cn(css.modalChiefIconWrapperWrappIconDiv)}>
                <img alt="twitter" src="/images/cardComponent/facebook.jpg" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalShare;