import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { OrderCardComponent } from '../shared/order-card/order-card.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, OrderCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
