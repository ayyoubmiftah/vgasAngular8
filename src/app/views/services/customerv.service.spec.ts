import { TestBed, inject } from '@angular/core/testing';

import { CustomervService } from './customerv.service';

describe('CustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomervService]
    });
  });

  it('should be created', inject([CustomervService], (service: CustomervService) => {
    expect(service).toBeTruthy();
  }));
});
