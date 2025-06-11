import { Component, inject, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExpandedService } from '../../expanded.service';

@Component({
  selector: 'app-info-card',
  imports: [MatExpansionModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
  private expandedService = inject(ExpandedService);

  @Input({ required: true }) key!: string;
  @Input({ required: true }) title!: string;

  get isExpanded() {
    return this.expandedService.initialExpanded() === this.key;
  }
}
