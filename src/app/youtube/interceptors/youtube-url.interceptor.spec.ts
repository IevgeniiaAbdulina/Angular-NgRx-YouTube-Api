import { TestBed } from '@angular/core/testing';

import { YoutubeUrlInterceptor } from './youtube-url.interceptor';

describe('YoutubeUrlInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [YoutubeUrlInterceptor]
    })
  );

  it('should be created', () => {
    const interceptor: YoutubeUrlInterceptor = TestBed.inject(
      YoutubeUrlInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
