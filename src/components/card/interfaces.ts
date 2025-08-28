import { IArticleChild } from "@/api";

export interface ICard {
  cardMain: IArticleChild["article"];
  cards?: IArticleChild["article"][];
  smallCardOA?: boolean;
}
