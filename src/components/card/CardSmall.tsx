import React from "react";
import cn from "classnames";
import css from "./CardSmall.module.css";
import shared from "./shared.module.css";
import { IArticle } from "@/api";

const CardSmall = ({
  cardMain,
  smallCardOA,
}: {
  cardMain: IArticle;
  smallCardOA?: boolean;
}) => {
  const { imageUrl, iconUrl, title, publishedAt, author } = cardMain;

  return (
    <div className={cn(css.cardSmall)}>
      <div
        className={cn(css.cardSmallLeftDiv, {
          [css.cardSmallLeftDivActive]: !smallCardOA,
        })}
      >
        {smallCardOA && (
          <div>
            <div className={cn(css.cardLeftDivIconDiv)}>
              <img alt={title} src={iconUrl || "https://ih1.redbubble.net/image.4905811472.8675/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg"} />
              <span>{author}</span>
            </div>
            <h2>{title}</h2>
          </div>
        )}
        {!smallCardOA && <h2>{title}</h2>}
      </div>

      <div
        className={cn(css.cardSmallRightDiv, {
          [css.cardSmallRightDivActive]: !smallCardOA,
        })}
      >
        <img alt={title} src={imageUrl || "https://ih1.redbubble.net/image.4905811472.8675/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg"} />
      </div>

      <div className={cn(css.smallWrapper)}>
        <p>
          {publishedAt
            ? new Date(publishedAt).toLocaleDateString()
            : "Нет даты"}{" "}
          • {author}
        </p>

        {smallCardOA && (
          <div
            className={cn(shared.toFullCoverageDiv)}
            style={{ backgroundColor: "transparent" }}
          >
            <a href={cardMain.url} target="_blank" rel="noopener noreferrer">
              <img
                alt="full coverage"
                src="/images/cardComponent/FullCoverage.webp"
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardSmall;
