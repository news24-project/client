import { IArticleChild } from "@/api";

export interface ICard {
  cardMain: IArticleChild;
  cards?: IArticleChild[];
  smallCardOA?: boolean;
}
