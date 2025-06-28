import { Component, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseComponent } from '../../../../core/base.component';

interface Table {
  id: number;
  activeOrders: number;
}

@Component({
  selector: 'app-home',
  imports: [MatBadgeModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends BaseComponent {
  
  // Generate 20 tables with simplified data (only active orders or free)
  tables = signal<Table[]>(this.generateInitialTables());

  // Computed properties for dashboard statistics
  totalTables = computed(() => this.tables().length);
  
  tablesWithOrders = computed(() => 
    this.tables().filter(table => table.activeOrders > 0).length
  );
  
  freeTables = computed(() => 
    this.tables().filter(table => table.activeOrders === 0).length
  );
  
  totalActiveOrders = computed(() => 
    this.tables().reduce((sum, table) => sum + table.activeOrders, 0)
  );

  constructor(private router: Router) {
    super();
    // Simulate real-time updates every 30 seconds
    setInterval(() => this.simulateOrderUpdates(), 30000);
  }

  private generateInitialTables(): Table[] {
    return Array.from({ length: 20 }, (_, i) => {
      const tableId = i + 1;
      // 40% chance of having orders, simpler logic
      const hasOrders = Math.random() < 0.4;
      
      return {
        id: tableId,
        activeOrders: hasOrders ? this.getRandomOrders() : 0
      };
    });
  }

  private getRandomOrders(): number {
    const weights = [0.5, 0.3, 0.15, 0.05]; // Probability distribution for 1-4 orders
    const random = Math.random();
    let cumulative = 0;
    
    for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i];
      if (random <= cumulative) {
        return i + 1;
      }
    }
    return 1;
  }

  private simulateOrderUpdates(): void {
    this.tables.update(tables => 
      tables.map(table => {
        // Small chance of order changes
        if (Math.random() < 0.1) { // 10% chance of change
          const change = Math.random() < 0.5 ? -1 : 1; // Add or remove order
          const newOrderCount = Math.max(0, Math.min(4, table.activeOrders + change));
          
          return {
            ...table,
            activeOrders: newOrderCount
          };
        }
        return table;
      })
    );
  }

  onTableClick(table: Table): void {
    if (table.activeOrders > 0) {
      console.log(`Table ${table.id} clicked - ${table.activeOrders} active orders`);
      // Navigate to order details page
      this.router.navigate(['/staff/waiter/order-details', table.id]);
    } else {
      console.log(`Table ${table.id} clicked - Free table, create new order`);
      // TODO: Navigate to new order creation
    }
  }

  // Helper method to get priority level based on order count
  getTablePriority(table: Table): 'low' | 'medium' | 'high' {
    if (table.activeOrders === 0) return 'low';
    if (table.activeOrders >= 3) return 'high';
    return table.activeOrders > 1 ? 'medium' : 'low';
  }
}
