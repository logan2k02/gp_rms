import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../core/base.component';
import { LayoutComponent } from '../layout/layout.component';
import { OfferCardComponent } from '../shared/offer-card/offer-card.component';

@Component({
  selector: 'app-home',
  imports: [LayoutComponent, NgOptimizedImage, OfferCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends BaseComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment)
        document
          .getElementById(fragment)
          ?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update((mo) => !mo);
  }
}
