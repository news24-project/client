import React from "react";
import cn from "classnames";
import css from "./modal.module.css";
import { IModalShare } from "./interfaces";
import XmarkIcon from "../../../public/icons/cardComponent/Xmark";
import Link from "next/link";
import LinkIcon from "../../../public/icons/cardComponent/Link";

const ModalShare = ({ isActiveModal, setIsActiveModal }: { 
  isActiveModal: boolean; 
  setIsActiveModal: (v: boolean) => void; 
}) => {
  const [shareData, setShareData] = React.useState<any>(null);

  React.useEffect(() => {
    if (isActiveModal) {
      const data = sessionStorage.getItem("shareData");
      if (data) setShareData(JSON.parse(data));
    }
  }, [isActiveModal]);

  if (!shareData) return null;

  return (
    <div className={cn(css.modal,{ [css.active]: isActiveModal })}>
      <div className={cn(css.modalBg)} onClick={() => setIsActiveModal(false)} />
      <div className={cn(css.modalChief)}>
        <div className={cn(css.modalChiefWrapper)}>
          <div className={cn(css.modalChiefWrapperWrapp)}>
            <img alt={shareData.imgIconText} src={shareData.imgIcon} />
            {shareData.imgIconText}
          </div>
          <div className={cn(css.modalChiefWrapperWrapp)} onClick={() => setIsActiveModal(false)}>
            <XmarkIcon />
          </div>
        </div>
        <h2>{shareData.description}</h2>
        <p>Share this via</p>
        <div className={cn(css.modalChiefIconWrapper)}>
          <div className={cn(css.modalChiefIconWrapperWrapp)}>
            <Link href={shareData.socials.link}>
              <div className={cn(css.modalChiefIconWrapperWrappIconDiv)}>
                <LinkIcon />
              </div>
              Copy Link
            </Link>
          </div>
          <div className={cn(css.modalChiefIconWrapperWrapp)}>
            <Link href={shareData.socials.facebookLink}>
              <div className={cn(css.modalChiefIconWrapperWrappIconDiv)}>
                <img alt="facebook" src="/images/cardComponent/facebook.jpg" />
              </div>
              Facebook
            </Link>
          </div>
          <div className={cn(css.modalChiefIconWrapperWrapp)}>
            <Link href={shareData.socials.twitterLink}>
              <div className={cn(css.modalChiefIconWrapperWrappIconDiv)} style={{ backgroundColor: "black" }}>
                <img alt="twitter" src="/images/cardComponent/twitter.avif" style={{ width: "90%", height: "90%" }}/>
              </div>
              X
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ModalShare;