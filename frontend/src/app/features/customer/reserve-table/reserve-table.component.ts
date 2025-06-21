import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reserve-table',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './reserve-table.component.html',
  styleUrl: './reserve-table.component.scss',
})
export class ReserveTableComponent {
  step = 0;

  goToNextStep() {
    this.step = this.step + 1;
  }
  goToPrevStep() {
    this.step = this.step - 1;
  }
}
