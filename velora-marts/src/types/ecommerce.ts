export interface Product {
    id: string;
    name: string;
    image: string;
    rating?: {
        count: number;
        stars: number
    };
    priceCents: number;
    keywords: string[];
    
}

export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    deliveryOptionId: string;
    product?: Product;
}
export interface PaymentSummary {
  totalItems: number;
  productCostCents: number;
  shippingCostCents: number;
  totalCostBeforeTaxCents: number;
  taxCents: number;
  totalCostCents: number;
}