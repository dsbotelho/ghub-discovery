import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private readonly loader = signal<boolean>(false);

  readonly isLoading = this.loader.asReadonly();

  updateLoading(value: boolean): void {
    this.loader.set(value);
  }
}
