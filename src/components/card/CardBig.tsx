import React from "react";
import cn from "classnames";
import css from "./CardBig.module.css";
import shared from "./shared.module.css";
import CardMenu from "./CardMenu";
import CardChild from "./CardChild";
import { ICardChild, ICardMain } from "./interfaces";

const CardBig = ({ cardMain, cards }: { cardMain: ICardMain; cards: ICardChild[] }) => {
  const { img, cardMainDiv } = cardMain;
  const { imgIcon, imgIconText, title, dateText, author, organization } = cardMainDiv;

  return (
    <div className={cn(css.cardBig)}>
      <div className={cn(css.cardLeft)}>
        <div className={cn(css.cardLeftImgDiv)}>
          <img alt={title} src={img} />
        </div>

        <div className={cn(css.cardLeftDiv)}>
          <div className={cn(css.cardLeftDivIconDiv)}>
            <img alt={imgIconText} src={imgIcon} />
            <span>{imgIconText}</span>
          </div>

          <h2>{title}</h2>
          <p>
            {dateText}
            <span className={cn(css.cardLeftDivText)}>&bull;</span>
            <span className={cn(css.cardLeftDivText)}>{author?.name}</span>
          </p>

          <CardMenu author={author} organization={organization} />
        </div>
      </div>

      <div className={cn(css.cardRight)}>
        {cards.map((child, i) => (
          <CardChild key={i} {...child} />
        ))}
      </div>

      <div className={cn(shared.toFullCoverageDiv)}>
        <a href="/#" target="_blank">
          <img alt="full coverage" src="/images/cardComponent/FullCoverage.webp" />
          Full coverage
        </a>
      </div>
    </div>
  );
};

export default CardBig;
