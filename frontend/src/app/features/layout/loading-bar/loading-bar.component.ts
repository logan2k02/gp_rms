import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GlobalLoadingBarService } from '../../../core/services';

@Component({
  selector: 'app-loading-bar',
  imports: [MatProgressBarModule],
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.scss',
})
export class LoadingBarComponent {
  loadingBar = inject(GlobalLoadingBarService);

  get loading() {
    return this.loadingBar.getLoading();
  }
}
