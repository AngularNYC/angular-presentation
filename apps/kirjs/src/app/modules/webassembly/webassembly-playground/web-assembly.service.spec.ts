import { TestBed } from '@angular/core/testing';

import { WebAssemblyService } from './web-assembly.service';

describe('WebAssemblyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebAssemblyService = TestBed.get(WebAssemblyService);
    expect(service).toBeTruthy();
  });
});
