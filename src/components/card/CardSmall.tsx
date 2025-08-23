import React from "react";
import cn from "classnames";
import css from "./CardSmall.module.css";
import shared from "./shared.module.css";
import { ICardMain } from "./interfaces";
import CardMenu from "./CardMenu";

const CardSmall = ({ cardMain, smallCardOA }: { cardMain: ICardMain; smallCardOA?: boolean }) => {
  const { img, cardMainDiv } = cardMain;
  const { imgIcon, imgIconText, title, dateText, author, organization } = cardMainDiv;

  return (
    <div className={cn(css.cardSmall)}>
      <div className={cn(css.cardSmallLeftDiv, {
        [css.cardSmallLeftDivActive]: !smallCardOA
      })}>
        {smallCardOA && (
          <div>
            <div className={cn(css.cardLeftDivIconDiv)}>
              <img alt={imgIconText} src={imgIcon} />
              <span>{imgIconText}</span>
            </div>
            <h2>{title}</h2>
          </div>
        )}
        {!smallCardOA && <h2>{title}</h2>}


        <CardMenu author={author} organization={organization} />
      </div>

      <div className={cn(css.cardSmallRightDiv, {
        [css.cardSmallRightDivActive]: !smallCardOA
      })}>
        <img alt={title} src={img} />
      </div>

      <div className={cn(css.smallWrapper)}>
        <p>
          {dateText}
          <span className={cn(css.cardLeftDivText)}>&bull;</span>
          <span className={cn(css.cardLeftDivText)}>{author?.name}</span>
        </p>

      {smallCardOA && (
        <div className={cn(shared.toFullCoverageDiv)} style={{backgroundColor: "transparent"}}>
          <a href="/#" target="_blank">
            <img alt="full coverage" src="/images/cardComponent/FullCoverage.webp" />
          </a>
        </div>
      )}
      </div>
    </div>
  );
};

export default CardSmall;
