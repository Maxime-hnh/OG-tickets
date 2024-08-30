export enum ProductStatus {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE"
}

export enum ProductCategory {
  SOLO = "SOLO",
  DUO = "DUO",
  FAMILIALE = "FAMILIALE"
}


export type ProductProps = Partial<{
  id: number;
  cur: string;
  name: string;
  description: string;
  image?: string;
  price: number;
  stock: number;
  active: boolean;
  status: ProductStatus;
  category: ProductCategory
}>
export type FetchedProduct = {
  id: number;
} & ProductProps


export default class Product implements ProductProps {
  name = "";
  description = "";
  price = 0;
  stock = 1000;
  active = true;
  status = ProductStatus.AVAILABLE;
  category = ProductCategory.DUO;
}
