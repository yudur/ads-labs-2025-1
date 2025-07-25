export interface OrderDTO {
  id: string;
  quantity: number;
  createdAt: string;

  customer: {
    name: string;
  };

  dish: {
    name: string;
    price: string;
  };

  total?: number;
}


export interface OrderCreateDTO {
  customerId: string;
  dishId: string;
  quantity: number;
}