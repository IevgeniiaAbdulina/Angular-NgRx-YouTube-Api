import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { videoListMock } from 'src/app/redux/mocks/video.mocks';
import { VideoItem } from 'src/app/shared/models/video-list-response';

import {
  sortedVideoListByDateMock,
  videoListSortedByViewsMock
} from '../../redux/mocks/sorted-video-list.mocks';
import { SortingService } from './sorting.service';

describe('SortingService', () => {
  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({})]
    });
    service = TestBed.inject(SortingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sort video list by date', () => {
    const isSorted = true;
    service.sortingByDate(isSorted);

    service.videoList$.subscribe(list => {
      expect(list).toEqual(sortedVideoListByDateMock);
    });
  });

  it('should sort video list by view count', () => {
    const isSorted = true;
    service.videoList$ = of(videoListMock);
    service.sortingByViews(isSorted);

    service.videoList$.subscribe(list => {
      expect(list).toEqual(videoListSortedByViewsMock);
    });
  });
});
