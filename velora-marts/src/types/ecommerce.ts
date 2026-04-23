export interface Product {
    id: string;
    name: string;
    image: string;
    rating: {
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