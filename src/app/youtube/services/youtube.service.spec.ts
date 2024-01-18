import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SearchListResponse } from 'src/app/shared/models/video-list-response';

import { YoutubeService } from './youtube.service';

describe('YoutubeService', () => {
  let service: YoutubeService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [YoutubeService]
    });
    service = TestBed.inject(YoutubeService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send request to get the video list from YouTube API', async () => {
    const postRequestSpy = jest.spyOn(httpClient, 'get');
    const reqArgs = 'angular';
    const expected = {
      params: {
        maxResults: 20,
        pageToken: '',
        part: 'snippet',
        q: 'angular',
        type: 'video'
      }
    };
    service.searchVideoByText(reqArgs).subscribe();

    expect(postRequestSpy).toHaveBeenCalledWith('search', expected);
  });

  it('should send request to get video detailed information from YouTube API ', async () => {
    const postRequestSpy = jest.spyOn(httpClient, 'get');
    const reqArgs = ['sdQGqO9xuao', 'hfJinyofQdk'];
    const expected = {
      params: {
        part: 'snippet, statistics',
        id: reqArgs.join(',')
      }
    };
    service.getVideoDetails(reqArgs).subscribe();

    expect(postRequestSpy).toHaveBeenCalledWith('videos', expected);
  });

  it('searchVideoByText() return an error when the server return a 404 error', done => {
    const mockError = new ProgressEvent('error');
    const testUrl = 'search';

    httpClient.get<SearchListResponse>(testUrl).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.error).toBe(mockError);
        done();
      }
    });
    const req = httpTestingController.expectOne(testUrl);

    req.error(mockError);
  });
});
