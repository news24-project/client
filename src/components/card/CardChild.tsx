import React from "react";
import cn from "classnames";
import css from "./CardChild.module.css";
import { ICardChild } from "./interfaces";
import CardMenu from "./CardMenu";

interface CardChildProps extends ICardChild {
  setIsActiveModal: (v: boolean) => void;
}

const CardChild = ({ cardMainDiv, setIsActiveModal }: CardChildProps) => {
  const { imgIcon, imgIconText, title, dateText, author, organization, socials } = cardMainDiv;

  return (
    <div className={cn(css.cardRightDiv)}>
      <div className={cn(css.cardRightDivIconDiv)}>
        <img alt={imgIconText} src={imgIcon} />
        <span>{imgIconText}</span>
      </div>
      <h2>{title}</h2>
      <p>
        {dateText}
        <span className={cn(css.cardRightDivText)}>&bull;</span>
        <span className={cn(css.cardRightDivText)}>{author?.name}</span>
      </p>
      <CardMenu
        author={author}
        organization={organization}
        socials={socials}
        imgIcon={imgIcon}
        imgIconText={imgIconText}
        setIsActiveModal={setIsActiveModal}
      />
    </div>
  );
};


export default CardChild;
