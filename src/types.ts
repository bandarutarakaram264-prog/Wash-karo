export interface Order {
  id: string;
  userName: string;
  phoneNumber: string;
  address: string;
  pickupDate: string;
  clothType: string;
  quantity: number;
  instructions: string;
  totalPrice: number;
  status: 'Order Placed' | 'Picked Up' | 'Washing' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
}

export interface User {
  email: string;
  name: string;
  isAdmin?: boolean;
}
