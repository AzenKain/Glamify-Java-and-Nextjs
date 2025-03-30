export interface orderDetailDto {
  productId?: string;
  quantity?: number;
  size?: string;
  color?: string;
  productName?: string;
}

export interface orderCreateDto {
  totalAmount?: number;
  listProducts?: orderDetailDto[];
  notes?: string;
  deliveryType?: string;
  city?: string;
  district?: string;
  address?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface orderUpdateDto {
  status?: string;
  orderId?: string;
  isPaid?: boolean;
}
