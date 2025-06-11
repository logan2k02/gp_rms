import { Component, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../core/base.component';
import { ExpandedService } from './expanded.service';
import { InfoCardComponent } from './shared/info-card/info-card.component';

@Component({
  selector: 'app-info',
  imports: [MatExpansionModule, InfoCardComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent extends BaseComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  private expandedService = inject(ExpandedService);

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment) {
        this.expandedService.initialExpanded.set(fragment);
        setTimeout(() => {
          window.scrollTo({
            behavior: 'smooth',
            top: 0,
          });
        }, 100);
      }
    });
  }
}
