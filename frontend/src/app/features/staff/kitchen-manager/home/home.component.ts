import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MatCellDef,
  MatHeaderCellDef,
  MatHeaderRowDef,
  MatRowDef,
  MatTableModule,
} from '@angular/material/table';

export interface Order {
  id: string;
  item: string;
  icon: string;
  address: string;
  status: string;
  statusClass: string;
  time: string;
}

export interface StatCard {
  title: string;
  value: string;
  label: string;
  icon: string;
  colorClass: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatHeaderCellDef,
    MatRowDef,
    MatCellDef,
    MatIconModule,
    MatSidenavModule,
    MatChip,
    MatFormField,
    MatSelectModule,
    MatHeaderRowDef,
    MatTableModule,
    MatButtonModule,
  ],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'item', 'address', 'status', 'time'];

  // Stats data
  statsCards: StatCard[] = [
    {
      title: 'Total Sales',
      value: '₹ 27,519',
      label: 'Total sales this week',
      icon: 'attach_money',
      colorClass: 'blue',
    },
    {
      title: 'Customer Rating',
      value: '4.7',
      label: 'Customer rating on Swiggy',
      icon: 'star',
      colorClass: 'purple',
    },
    {
      title: 'Orders Delivered',
      value: '5,985',
      label: 'Orders delivered this week',
      icon: 'shopping_bag',
      colorClass: 'teal',
    },
  ];

  // Orders data
  ongoingOrders: Order[] = [
    {
      id: '#25656',
      item: 'McSpicy Paneer +2 more',
      icon: 'restaurant',
      address: '16th cross, BTM Layout',
      status: 'Awaiting approval',
      statusClass: 'status-pending',
      time: '',
    },
    {
      id: '#25346',
      item: 'Maharaja Mac Meal (R)',
      icon: 'fastfood',
      address: 'Shivnani Industrial Estate No. 1721, Worli layout',
      status: 'Awaiting approval',
      statusClass: 'status-pending',
      time: '',
    },
    {
      id: '#25976',
      item: 'McVeggie Combo',
      icon: 'restaurant',
      address: '4th main Road, NGEF Layout',
      status: 'Out for delivery',
      statusClass: 'status-delivery',
      time: '12:34 PM',
    },
    {
      id: '#25917',
      item: 'Chicken Ramali Feast Box',
      icon: 'fastfood',
      address: 'No.30/1B3, DM Towers, Sector 2, HSR Layout',
      status: 'Out for delivery',
      statusClass: 'status-delivery',
      time: '12:34 PM',
    },
    {
      id: '#25903',
      item: 'McLayer American Meal',
      icon: 'restaurant',
      address: '16th cross, BTM Layout',
      status: 'Preparing',
      statusClass: 'status-preparing',
      time: '12:34 PM',
    },
  ];

  // Chart data
  stockFilter = 'all';

  lowStockIngredients = [
    { name: 'Tomato Sauce', currentStock: 1.2, minRequired: 2.0, unit: 'L' },
    {
      name: 'Mozzarella Cheese',
      currentStock: 0.5,
      minRequired: 1.0,
      unit: 'kg',
    },
    { name: 'Basil', currentStock: 0.1, minRequired: 0.5, unit: 'kg' },
    { name: 'Pizza Dough', currentStock: 30, minRequired: 50, unit: 'pcs' },
    { name: 'Olive Oil', currentStock: 1.0, minRequired: 0.5, unit: 'L' },
  ];

  displayedColumnss: string[] = [
    'name',
    'currentStock',
    'minRequired',
    'status',
    'action',
  ];

  requestMore(item: any): void {
    alert(`Requesting more of: ${item.name}`);
  }

  ordersData = {
    accepted: 60,
    cancelled: 28,
    outOfStock: 12,
  };

  selectedTimeFrame = 'week';

  constructor() {}

  ngOnInit(): void {
    // Component initialization logic can go here
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Simulate API call to load dashboard data
    console.log('Loading dashboard data...');

    // In a real application, you would make HTTP calls here
    // this.dashboardService.getStats().subscribe(data => this.statsCards = data);
    // this.dashboardService.getOrders().subscribe(data => this.ongoingOrders = data);
    // this.dashboardService.getRevenueData().subscribe(data => this.revenueData = data);
  }

  getStatusChipClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'awaiting approval':
        return 'status-pending';
      case 'out for delivery':
        return 'status-delivery';
      case 'preparing':
        return 'status-preparing';
      default:
        return 'status-default';
    }
  }

  onOrderAction(orderId: string, action: string): void {
    // Handle order actions like approve, reject, etc.
    console.log(`Action ${action} performed on order ${orderId}`);

    // In a real application, you would make an API call here
    // this.orderService.updateOrderStatus(orderId, action).subscribe();
  }

  refreshDashboard(): void {
    // Refresh all dashboard data
    this.loadDashboardData();
  }
}
