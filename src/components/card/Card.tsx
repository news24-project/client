"use client";
import React from "react";
import { ICard } from "./interfaces";
import CardBig from "./CardBig";
import CardSmall from "./CardSmall";

const Card = ({ cardMain, cards, smallCardOA}: ICard) => {
  if (cards?.length) {
    return <CardBig cardMain={cardMain} cards={cards} />;
  }
  return <CardSmall cardMain={cardMain} smallCardOA={smallCardOA} />;
};

export default Card;