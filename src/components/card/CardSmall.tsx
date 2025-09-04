import React from "react";
import cn from "classnames";
import css from "./CardSmall.module.css";
import shared from "./shared.module.css";
import { IArticleChild } from "@/api";
import CardMenu from "./CardMenu";
import { formatDate } from "@/utils/dataText";

const CardSmall = ({
  cardMain,
  smallCardOA,
}: {
  cardMain: IArticleChild;
  smallCardOA?: boolean;
}) => {
  const {
    imageUrl = "",
    iconUrl = "",
    title = "",
    publishedAt,
    author,
    url,
  } = cardMain.article || {};
  const articleId = cardMain.articleId;

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
              {iconUrl ? <img alt={title} src={iconUrl} /> : null}
              <span>{author}</span>
            </div>
            <h2>{title}</h2>
            <CardMenu
              url={url}
              title={title}
              author={author || ""}
              iconUrl={iconUrl || ""}
              articleId={articleId}
              isSmallMenu
            />
          </div>
        )}
        {!smallCardOA && <h2>{title}</h2>}
      </div>

      <div
        className={cn(css.cardSmallRightDiv, {
          [css.cardSmallRightDivActive]: !smallCardOA,
        })}
      >
        {imageUrl ? <img alt={title} src={imageUrl} /> : null}
      </div>

      <div className={cn(css.smallWrapper)}>
        <p>
          {formatDate(publishedAt)} •{" "}
          <span className={cn(css.cardLeftDivText)}>{author}</span>
        </p>
        {smallCardOA ? null : (
          <CardMenu
            url={url}
            title={title}
            author={author || ""}
            iconUrl={iconUrl || ""}
            articleId={articleId}
          />
        )}
        {smallCardOA && (
          <div
            className={cn(shared.toFullCoverageDivSmall)}
            style={{ backgroundColor: "transparent" }}
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
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
