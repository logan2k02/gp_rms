import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ingredient',
  imports: [MatCardModule, MatChipsModule, MatIconModule, CommonModule],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.scss',
})
export class IngredientComponent {
  hasAllergens = false;
}
