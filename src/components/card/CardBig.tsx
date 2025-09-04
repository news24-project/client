import React from "react";
import cn from "classnames";
import css from "./CardBig.module.css";
import shared from "./shared.module.css";
import CardChild from "./CardChild";
import { IArticleChild } from "@/api";
import CardMenu from "./CardMenu";
import { formatDate } from "@/utils/dataText";

const CardBig = ({
  cardMain,
  cards,
}: {
  cardMain: IArticleChild;
  cards: IArticleChild[];
}) => {
  const articleId = cardMain.articleId;
  const {
    imageUrl = "",
    iconUrl = "",
    title = "",
    publishedAt = "",
    author,
    url,
  } = cardMain.article || {};

  return (
    <div className={cn(css.cardBig)}>
      <div className={cn(css.cardLeft)}>
        <div className={cn(css.cardLeftImgDiv)}>
          {imageUrl ? <img alt={title} src={imageUrl} /> : null}
        </div>

        <div className={cn(css.cardLeftDiv)}>
          <div className={cn(css.cardLeftDivIconDiv)}>
            {iconUrl ? <img alt={title} src={iconUrl} /> : null}
            <span>{author}</span>
          </div>

          <h2>{title}</h2>
          <p>
            {formatDate(publishedAt)} •{" "}
            <span className={cn(css.cardLeftDivText)}>{author}</span>
          </p>

          <CardMenu
            url={url}
            title={title}
            author={author || ""}
            iconUrl={iconUrl || ""}
            articleId={articleId}
          />
        </div>
      </div>

      <div className={cn(css.cardRight)}>
        {cards.slice(0, 3).map((child, i) => (
          <CardChild key={i} cardMain={child} />
        ))}
      </div>

      <div className={cn(shared.toFullCoverageDiv)}>
        <a href={url} target="_blank">
          <img
            alt="full coverage"
            src="/images/cardComponent/FullCoverage.webp"
          />
          Full coverage
        </a>
      </div>
    </div>
  );
};

export default CardBig;
