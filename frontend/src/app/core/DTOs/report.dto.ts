export interface TopDishDTO {
    id: string;
    name: string;
    order_count: string;
}

export interface TopCustomerByOrderDTO {
    id: string;
    name: string;
    order_count: string;
}

export interface TopCustomerByValueDTO {
    id: string;
    name: string;
    total_spent: string;
}