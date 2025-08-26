import { IArticle } from "@/api";

export interface ICard {
  cardMain: IArticle;
  cards?: IArticle[];
  smallCardOA?: boolean;
}
