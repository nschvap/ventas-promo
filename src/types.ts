import { User } from "firebase/auth";

export interface UserType extends User {
  color: string;
  nickname: string;
  image: string;
}

export interface Category {
  earned: number;
  endDate: string;
  id: string;
  name: string;
  price: number;
  priceExplained: string;
  startDate: string;
  type: "comida" | "numeritos" | "anticipadas";
  limit: number;
}

export interface Sell {
  id: string;
  sellerId: string;
  category: string;
  buyer: string;
  quantity: number;
  sellDate: string;
}
