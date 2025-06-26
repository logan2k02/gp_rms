import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrderDetailsModalComponent } from '../order-details-modal/order-details-modal.component';

@Component({
  selector: 'app-order-card',
  imports: [MatCardModule, MatButtonModule, MatDialogModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent {
  constructor(private dialog: MatDialog) {}

  openOrderDetails(order: any) {
    this.dialog.open(OrderDetailsModalComponent, {
      width: '400px',
      data: { order },
    });
  }

  orders = [
    {
      id: 23504,
      name: 'John Doe',
      table: 20,
      time: '10:45 AM',
      note: 'Rathu kesel one ayye',
      items: [
        '2x Margerita Pizza',
        '2x Sausage Pizza',
        '2x Pineapple Pizza',
        '2x Double Chicken Pizza',
      ],
    },
    {
      id: 23505,
      name: 'Jane Smith',
      table: 12,
      time: '11:10 AM',
      note: '',
      items: ['1x Veggie Pizza', '1x Garlic Bread'],
    },
  ];
}
