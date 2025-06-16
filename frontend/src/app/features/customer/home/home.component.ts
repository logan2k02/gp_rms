import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../core/base.component';
import { OfferCardComponent } from '../shared/offer-card/offer-card.component';
import { OfferCardStaticComponent } from '../shared/offer-card-static/offer-card-static.component';
import { TestimonialCardComponent } from '../shared/testimonial-card/testimonial-card.component';

@Component({
  selector: 'app-home',
  imports: [
    NgOptimizedImage,
    OfferCardComponent,
    OfferCardStaticComponent,
    TestimonialCardComponent,
    MatButtonModule,
  ],
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

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }

  @ViewChild('testimonialScroll', { static: false }) scrollEl!: ElementRef;

  scrollLeftT() {
    this.scrollEl.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRightT() {
    this.scrollEl.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

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
