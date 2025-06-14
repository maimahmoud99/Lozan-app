import { BaseDto } from "./base";

export interface OrderDto extends BaseDto  {
    orderDate: string; // ISO format datetime string
    totalAmount: number;
    addresses: AddressDto[];
    orderItems: OrderItemDto[];
    payment: PaymentOrdersDto;
    isActive: boolean;
    paymentType: number;
    paymentLink: string;
  }
  
  export interface OrderItemDto {
    productId: number;
    productName: string;
    productDescription: string;
    quantity: number;
    price: number;
  }
  export interface AddressDto {
    name: string;
    email: string;
    street: string;
    cityId?: number;
    city: string;
    postalCode: string;
    country: string;
    countryId?: number;
    neighborhood: string;
    // Add more fields as needed
  }
  export interface PaymentOrdersDto extends BaseDto {
    orderId: number;
    amount: number;
    paymentDate: string; // ISO format string (e.g., "2025-05-09T12:00:00Z")
    paymentMethod: string;
    transactionNumber: string;
    status: string;
  }
      