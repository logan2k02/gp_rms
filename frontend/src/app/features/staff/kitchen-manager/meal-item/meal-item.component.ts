import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-meal-item',
  imports: [
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatChipsModule,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './meal-item.component.html',
  styleUrl: './meal-item.component.scss',
})
export class MealItemComponent {}
