import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MatCellDef,
  MatHeaderCellDef,
  MatHeaderRowDef,
  MatRowDef,
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
    MatChipSet,
    MatChip,
    MatFormField,
    MatSelectModule,
    MatHeaderRowDef,
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
  revenueData = {
    thisWeek: [120, 140, 180, 160, 200, 190, 210],
    lastWeek: [100, 120, 150, 140, 170, 160, 180],
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };

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

  onTimeFrameChange(timeFrame: string): void {
    this.selectedTimeFrame = timeFrame;
    // Reload chart data based on selected timeframe
    this.loadChartData(timeFrame);
  }

  loadChartData(timeFrame: string): void {
    // Simulate loading different data based on timeframe
    switch (timeFrame) {
      case 'week':
        this.revenueData = {
          thisWeek: [120, 140, 180, 160, 200, 190, 210],
          lastWeek: [100, 120, 150, 140, 170, 160, 180],
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        };
        break;
      case 'month':
        this.revenueData = {
          thisWeek: [1200, 1400, 1800, 1600, 2000, 1900, 2100],
          lastWeek: [1000, 1200, 1500, 1400, 1700, 1600, 1800],
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        };
        break;
      case 'year':
        this.revenueData = {
          thisWeek: [12000, 14000, 18000, 16000, 20000, 19000, 21000],
          lastWeek: [10000, 12000, 15000, 14000, 17000, 16000, 18000],
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        };
        break;
    }
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
