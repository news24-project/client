import React from "react";
import cn from "classnames";
import css from "./CardBig.module.css";
import shared from "./shared.module.css";
import CardChild from "./CardChild";
import { IArticleChild } from "@/api";

const CardBig = ({
  cardMain,
  cards,
}: {
  cardMain: IArticleChild["article"];
  cards: IArticleChild["article"][];
}) => {
  const { imageUrl, iconUrl, title, publishedAt, author, url } =
    cardMain;

  return (
    <div className={cn(css.cardBig)}>
      <div className={cn(css.cardLeft)}>
        <div className={cn(css.cardLeftImgDiv)}>
          <img
            alt={title}
            src={
              imageUrl ||
              "https://ih1.redbubble.net/image.4905811472.8675/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
            }
          />
        </div>

        <div className={cn(css.cardLeftDiv)}>
          <div className={cn(css.cardLeftDivIconDiv)}>
            <img
              alt={title}
              src={
                iconUrl ||
                "https://ih1.redbubble.net/image.4905811472.8675/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
              }
            />
            <span>{author}</span>
          </div>

          <h2>{title}</h2>
          <p>
            {publishedAt
              ? new Date(publishedAt).toLocaleDateString()
              : "Нет даты"}
            <span className={cn(css.cardLeftDivText)}>&bull;</span>
            <span className={cn(css.cardLeftDivText)}>{author}</span>
          </p>
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
