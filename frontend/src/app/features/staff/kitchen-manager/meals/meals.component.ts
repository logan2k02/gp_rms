import { Component, signal } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MealComponent } from '../shared/meal/meal.component';

@Component({
  selector: 'app-meals',
  imports: [MatAccordion, MatExpansionModule, MatInputModule, MealComponent],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.scss',
})
export class MealsComponent {
  panelOpenState = signal(false);
}
