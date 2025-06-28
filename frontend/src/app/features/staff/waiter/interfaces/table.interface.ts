export interface Table {
  id: number;
  activeOrders: number;
  status: TableStatus;
  lastOrderTime?: Date;
  assignedWaiter?: string;
}

export enum TableStatus {
  Available = 'available',
  Occupied = 'occupied',
  Reserved = 'reserved',
  Cleaning = 'cleaning',
  OutOfOrder = 'out-of-order'
}

export interface Order {
  id: number;
  tableId: number;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  customerName?: string;
  specialInstructions?: string;
}

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  specialRequests?: string;
}

export enum OrderStatus {
  Pending = 'pending',
  Preparing = 'preparing',
  Ready = 'ready',
  Served = 'served',
  Cancelled = 'cancelled'
}
