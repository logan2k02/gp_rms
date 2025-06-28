import { Component, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../../../core/base.component';

interface OrderItem {
  id: string;
  status: 'new' | 'preparing' | 'ready';
  items: string;
  timestamp: string;
  timeAgo: string;
  priority: 'low' | 'medium' | 'high';
}

interface TableDetails {
  id: number;
  orders: OrderItem[];
  totalOrders: number;
}

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent extends BaseComponent implements OnInit {
  
  tableDetails = signal<TableDetails | null>(null);
  isLoading = signal(true);
  
  // Computed properties for order statistics
  newOrders = computed(() => 
    this.tableDetails()?.orders.filter(order => order.status === 'new').length || 0
  );
  
  readyOrders = computed(() => 
    this.tableDetails()?.orders.filter(order => order.status === 'ready').length || 0
  );
  
  preparingOrders = computed(() => 
    this.tableDetails()?.orders.filter(order => order.status === 'preparing').length || 0
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    // Get table ID from route parameters
    const tableId = this.route.snapshot.paramMap.get('id');
    if (tableId) {
      this.loadTableDetails(parseInt(tableId));
    } else {
      this.router.navigate(['/staff/waiter/home']);
    }
  }

  private loadTableDetails(tableId: number): void {
    // Simulate API call - replace with actual service call
    setTimeout(() => {
      this.tableDetails.set(this.generateMockTableData(tableId));
      this.isLoading.set(false);
    }, 500);
  }

  private generateMockTableData(tableId: number): TableDetails {
    // Generate realistic mock data
    const orders: OrderItem[] = [];
    const orderCount = Math.floor(Math.random() * 4) + 1; // 1-4 orders
    
    for (let i = 0; i < orderCount; i++) {
      const statuses: ('new' | 'preparing' | 'ready')[] = ['new', 'preparing', 'ready'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      const mockItems = [
        'Fried Rice x2, Coke x1',
        'Grilled Salmon and Caesar Salad',
        'Chicken Pasta x1, Garlic Bread x2',
        'Beef Burger, Fries, Pepsi x1',
        'Margherita Pizza x1, Orange Juice x2',
        'Tom Yum Soup, Pad Thai x1',
        'Fish and Chips, Iced Tea x1'
      ];
      
      const timeAgos = ['Just now', '2 minutes ago', '5 minutes ago', '8 minutes ago', '15 minutes ago'];
      const timestamps = ['14:32', '14:30', '14:27', '14:24', '14:17'];
      
      orders.push({
        id: `order-${tableId}-${i + 1}`,
        status,
        items: mockItems[Math.floor(Math.random() * mockItems.length)],
        timestamp: timestamps[Math.floor(Math.random() * timestamps.length)],
        timeAgo: timeAgos[Math.floor(Math.random() * timeAgos.length)],
        priority: status === 'ready' ? 'high' : status === 'preparing' ? 'medium' : 'low'
      });
    }

    return {
      id: tableId,
      orders,
      totalOrders: orders.length
    };
  }

  getStatusInfo(status: OrderItem['status']): { label: string; icon: string; class: string } {
    switch (status) {
      case 'new':
        return {
          label: 'New Order',
          icon: 'restaurant_menu',
          class: 'status-new'
        };
      case 'preparing':
        return {
          label: 'Preparing',
          icon: 'schedule',
          class: 'status-preparing'
        };
      case 'ready':
        return {
          label: 'Meal Ready',
          icon: 'done',
          class: 'status-ready'
        };
      default:
        return {
          label: 'Unknown',
          icon: 'help',
          class: 'status-unknown'
        };
    }
  }

  onOrderClick(order: OrderItem): void {
    console.log('Order clicked:', order);
    // TODO: Navigate to detailed order view or show order actions
  }

  onBackClick(): void {
    this.router.navigate(['/staff/waiter/home']);
  }

  onRefresh(): void {
    if (this.tableDetails()) {
      this.isLoading.set(true);
      this.loadTableDetails(this.tableDetails()!.id);
    }
  }
}
