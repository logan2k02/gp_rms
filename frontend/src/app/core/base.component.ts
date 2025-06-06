import { Component, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { AppIconName, AppIcons } from '../icons';

@Component({
  template: '',
})
export abstract class BaseComponent implements OnDestroy {
  protected sub$ = new SubSink();

  getAppIcon(icon: AppIconName) {
    return AppIcons[icon];
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
