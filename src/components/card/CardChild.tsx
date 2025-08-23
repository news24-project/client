import React from "react";
import cn from "classnames";
import css from "./CardChild.module.css";
import { ICardChild } from "./interfaces";
import CardMenu from "./CardMenu";

const CardChild = ({ cardMainDiv }: ICardChild) => {
  const { imgIcon, imgIconText, title, dateText, author, organization } = cardMainDiv;

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
      <CardMenu author={author} organization={organization} />
    </div>
  );
};

export default CardChild;
