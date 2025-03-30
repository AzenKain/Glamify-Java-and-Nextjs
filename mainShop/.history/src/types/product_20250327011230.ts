
export type IImage = {
  url: string;
  link?: string[];
}

export type ISales =  {

}

export type IDetail = {

}

export type ProductType = {
  id?: string;

  productName: string;

  isDisplay?: boolean;

  cost: number;

  price: number;

  stockQuantity: number;

  imgDisplay: IImage[];

  productType: string;

  color: string[];

  size: string[];

  buyCount?: number;

  rating?: number;


  tags?: string[];
  company?: string;
  materials?: string[];

  sales?: ISales;

  description?: string;

  updateAt?: Date,

  createdAt?: Date
}
