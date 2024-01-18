import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { CustomVideoService } from './custom-video.service';

describe('CustomVideoService', () => {
  let service: CustomVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CustomVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
