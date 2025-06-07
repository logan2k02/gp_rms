import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BaseComponent } from '../../../core/base.component';

@Component({
  selector: 'app-customer-layout',
  imports: [RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent extends BaseComponent {
  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update((mo) => !mo);
  }
}
