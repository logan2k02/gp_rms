import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../core/base.component';
import { OfferCardComponent } from '../shared/offer-card/offer-card.component';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, OfferCardComponent, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent extends BaseComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  sliderImages = [
    '/images/home/hero-slider-1.jpg',
    '/images/home/hero-slider-2.jpg',
    '/images/home/hero-slider-3.jpg',
    '/images/home/hero-slider-4.jpg',
    '/images/home/hero-slider-5.jpg',
  ];

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
