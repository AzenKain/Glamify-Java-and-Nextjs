export type IImage = {
  url: string;
  link?: string[];
}


export type addProductDto = {
  isSales?: boolean;
  
  percents?: number;

  end?: Date;

  tags?: string[];

  company?: string;
  
  materials?: string[];

  productName: string;

  userId?: string;

  price: number;

  cost: number;

  stockQuantity: number;

  productType: string;

  color?: string[];

  size?: string[];

  imgDisplay?: IImage[];

  description?: string;
}
