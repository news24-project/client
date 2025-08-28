import React from "react";
import cn from "classnames";
import css from "./CardChild.module.css";
import CardMenu from "./CardMenu";
import { IArticleChild } from "@/api";

const CardChild = ({ cardMain }: { cardMain: IArticleChild["article"] }) => {
  const { iconUrl, title, publishedAt, author, url } = cardMain;

  return (
    <div className={cn(css.cardRightDiv)}>
      <div className={cn(css.cardRightDivIconDiv)}>
        <img alt={title} src={iconUrl || "https://ih1.redbubble.net/image.4905811472.8675/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg"} />
        <span>{author}</span>
      </div>
      <h2>{title}</h2>
      <p>
        {publishedAt ? new Date(publishedAt).toLocaleDateString() : "Нет даты"}
        <span className={cn(css.cardRightDivText)}>&bull;</span>
        <span className={cn(css.cardRightDivText)}>{author}</span>
      </p>
      <CardMenu
        url={url}
        title={title}
        author={author || ""}
        iconUrl={iconUrl || "https://ih1.redbubble.net/image.4905811472.8675/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg"}
      />
    </div>
  );
};

export default CardChild;
