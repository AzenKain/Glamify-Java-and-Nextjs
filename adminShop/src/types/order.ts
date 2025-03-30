import {ProductType} from './product';



export type OrderType = {
    id: string;
    isDisplay: boolean;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    totalAmount: number;
    listProducts: OrderProductType[];
    deliveryType?: string;
    deliveryFee?: number;
    discount?: number;
    city?: string;
    district?: string;
    address: string;
    status: string;
    notes?: string;
    isPaid?: boolean;
    paymentType?: string;
    bank?: string;
    trackId?: string;
    created_at: Date;
    updated_at: Date;
};


export type OrderProductType = {
    id: string;
    productId: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
};
