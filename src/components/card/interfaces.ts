export interface ICard {
  cardMain: ICardMain;
  cards?: ICardChild[];
  smallCardOA?: boolean;
}

export interface ICardMain {
  img: string;
  cardMainDiv: ICardMainDiv;
}

export interface ICardMainDiv {
  imgIcon: string;
  imgIconText: string;
  title: string;
  dateText: string;
  author?: IAuthor;
  organization: IOrganization;
  socials?: string[];
}

export interface IAuthor {
  id?: string;
  name?: string;
}

export interface IOrganization {
  id: string;
  title: string;
}

export interface ICardChild {
  cardMainDiv: ICardMainDiv;
}
