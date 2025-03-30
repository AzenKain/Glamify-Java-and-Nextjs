import { IImage } from "./addProduct.dto";

export type editProductDto =  {
  productId?: string;

  productName: string;

  userId?: string;

  price: number;

  cost: number;

  stockQuantity: number;

  productType: string;

  color?: string[];

  size?: string[];

  tags?: string[];

  company?: string;
  
  materials?: string[];

  imgDisplay?: IImage[];

  description?: string;
}
