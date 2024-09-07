export enum ProductCategory {
  SOLO = "SOLO",
  DUO = "DUO",
  FAMILY = "FAMILY"
}


export type ProductProps = Partial<{
  id: number;
  cur: string;
  name: string;
  description: string;
  image?: string;
  price: number;
  stock: number;
  city: string;
  venue: string;
  stage: string;
  visible: boolean;
  date: string | null;
  startTime: string;
  endTime: string;
  category: ProductCategory;

  edit?: boolean;
}>
export type FetchedProduct = {
  id: number;
} & ProductProps


export default class Product implements ProductProps {
  name = "";
  description = "";
  price = 0;
  stock = 1000;
  city = "";
  venue =  "";
  stage = "";
  visible = true;
  date = null;
  startTime = "";
  endTime = "";
  category = ProductCategory.DUO;
  edit = false;
}
