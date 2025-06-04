import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private log(
    fn: (message?: any, ...optionalParams: any[]) => void,
    source: string,
    content: any
  ) {
    if (environment.loggingEnabled) {
      fn(`[${source}]`, ...content);
    }
  }

  error(source: string, ...content: any[]) {
    this.log(console.error, source, content);
  }

  warn(source: string, ...content: any[]) {
    this.log(console.warn, source, content);
  }

  info(source: string, ...content: any[]) {
    this.log(console.info, source, content);
  }
}
