import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { IngredientComponent } from '../shared/ingredient/ingredient.component';

@Component({
  selector: 'app-ingredients',
  imports: [MatTabsModule, MatIconModule, IngredientComponent],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss',
})
export class IngredientsComponent {}
