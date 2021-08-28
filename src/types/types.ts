
export enum EImageTerms {
  DISGUSTING_HAMBURGER = "disgusting hamburger",
  HAMBURGER = "hamburger"
}
export interface IGetAllReviewsResult {
  data: IReview
}

export interface IPost {
  id: string;
  imgUrl: string;
  description: string;
  timestamp: number;
  creator: {
    id: number;
    name: string;
  }
}

export interface IGetAllPostResult {
  data: IPost
}

export interface IGetAllRestaurants {
  data: IRestaurant
}

export interface IRestaurant {
  id: number;
  city: string,
  country: string,
  street: string,
  name: string,
  zipCode: string
}

export interface IReview {
  id: number;
  description: string;
  ratings: IRating;
  user: IUser;
  restaurant: Pick<IRestaurant, "id" | "name">;
  date: string
  timestamp: number
}

interface IRating {
  texture: number;
  taste: number;
  presentation: number;
}

interface IUser {
  id: number;
  name: string
}

export interface IRestaurant {
  id: number;
  name: string;

}