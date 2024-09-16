import {ProductProps} from "@/_objects/Product";

export enum OrderStatus {
  DRAFT = "DRAFT",
  CREATED = "CREATED",
  VALIDATED = "VALIDATED",
  DONE = "DONE"
}

export interface SelectedProducts {
  id: number;
  name: string;
  price: number;
  quantity: number;
}


export type OrderProps = Partial<{
  id: number;
  cur: string;
  amount: number;
  status: OrderStatus;
  invoice: string;
  key: string;
  finalKey: string;
  qrCode?: any;
  products: SelectedProducts[];
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}>

export type FetchedOrder = {
  id: number;
} & OrderProps

export default class Order implements OrderProps {
  amount = 0;
  status = OrderStatus.DRAFT;
  products = [];
}