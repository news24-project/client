import React from "react";
import cn from "classnames";
import css from "./CardChild.module.css";
import CardMenu from "./CardMenu";
import { IArticleChild } from "@/api";
import { formatDate } from "@/utils/dataText";

const CardChild = ({ cardMain }: { cardMain: IArticleChild }) => {
  const { iconUrl = "", title, publishedAt, author, url } = cardMain || {};
  const articleId = cardMain.id;

  return (
    <div className={cn(css.cardRightDivGlobal)}>
      <div className={cn(css.cardRightDiv)}>
        <div className={cn(css.cardRightDivIconDiv)}>
          {iconUrl ? <img alt={title} src={iconUrl} /> : null}
          <span>{author}</span>
        </div>
        <h2>{title}</h2>
        <p>
          {formatDate(publishedAt)} •{" "}
          <span className={cn(css.cardLeftDivText)}>{author}</span>
        </p>
      </div>
      <CardMenu
        url={url}
        title={title}
        author={author || ""}
        iconUrl={iconUrl || ""}
        articleId={articleId}
      />
    </div>
  );
};

export default CardChild;
