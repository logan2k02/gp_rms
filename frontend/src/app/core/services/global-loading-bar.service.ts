import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalLoadingBarService {
  private loading: WritableSignal<boolean> = signal(false);

  getLoading(): boolean {
    return this.loading();
  }

  startLoading(): void {
    this.loading.set(true);
  }

  stopLoading(): void {
    this.loading.set(false);
  }
}
