import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/redux/appState.interface';
import { selectVideoList } from 'src/app/redux/selectors/video.selectors';

import { VideoItem } from '../../shared/models/video-list-response';
import { VideoDataService } from './video-data.service';

@Injectable({
  providedIn: 'root'
})
export class SortingService {
  videoList$: Observable<VideoItem[]>;

  constructor(
    private videoDataService: VideoDataService,
    private store: Store<AppState>
  ) {
    this.videoList$ = this.store.select(selectVideoList);
  }

  sortingByDate(isSortedByDate: boolean): void {
    this.videoList$.subscribe((videoList: VideoItem[]) => {
      [...videoList].sort((valueLeft: VideoItem, valueRight: VideoItem) => {
        const timeOfLeft = new Date(valueLeft.snippet.publishedAt).getTime();
        const timeOfRight = new Date(valueRight.snippet.publishedAt).getTime();

        return isSortedByDate
          ? timeOfLeft - timeOfRight
          : timeOfRight - timeOfLeft;
      });
    });
  }

  sortingByViews(isSortedByViews: boolean): void {
    this.videoDataService.getVideoList.subscribe(videoList => {
      videoList.sort((valueLeft: VideoItem, valueRight: VideoItem) => {
        const viewsOfLeft = Number(valueLeft.statistics.viewCount);
        const viewsOfRight = Number(valueRight.statistics.viewCount);

        return isSortedByViews
          ? viewsOfLeft - viewsOfRight
          : viewsOfRight - viewsOfLeft;
      });
    });
  }
}
