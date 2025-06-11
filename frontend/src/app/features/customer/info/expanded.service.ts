import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpandedService {
  initialExpanded = signal('');
}
