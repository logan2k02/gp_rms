import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-offer-card',
  imports: [NgOptimizedImage, RouterModule],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.scss',
})
export class OfferCardComponent {}
