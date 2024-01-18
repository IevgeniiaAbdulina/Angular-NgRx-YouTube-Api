import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { VideoDataService } from './video-data.service';

describe('VideoDataService', () => {
  let service: VideoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(VideoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
