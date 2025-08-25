"use client";
import React from "react";
import { ICard } from "./interfaces";
import CardBig from "./CardBig";
import CardSmall from "./CardSmall";

const Card = ({ cardMain, cards, smallCardOA, setIsActiveModal }: ICard) => {
  if (cards?.length) {
    return <CardBig cardMain={cardMain} cards={cards} setIsActiveModal={setIsActiveModal}/>;
  }
  return <CardSmall cardMain={cardMain} smallCardOA={smallCardOA} setIsActiveModal={setIsActiveModal}/>;
};

export default Card;