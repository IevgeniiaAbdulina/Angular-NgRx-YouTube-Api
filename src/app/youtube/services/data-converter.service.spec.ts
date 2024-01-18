import { TestBed } from '@angular/core/testing';

import { DataConverter } from './data-converter.service';

describe('DataConverter', () => {
  let service: DataConverter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataConverter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
