import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.isLoading()).toBeFalsy();
  });

  it('should update loading status', () => {
    service.updateLoading(true);
    expect(service.isLoading()).toBeTruthy();

    service.updateLoading(false);
    expect(service.isLoading()).toBeFalsy();
  });
});
