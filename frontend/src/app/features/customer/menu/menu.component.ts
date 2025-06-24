import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from '../shared/menu-item/menu-item.component';

@Component({
  selector: 'app-menu',
  imports: [MatButtonModule, RouterModule, MenuItemComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {}
