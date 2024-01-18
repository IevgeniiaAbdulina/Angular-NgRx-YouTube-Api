import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from 'src/app/redux/appState.interface';
import { selectVideoList } from 'src/app/redux/selectors/video.selectors';
import { VideoItem } from 'src/app/shared/models/video-list-response';

import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class VideoDataService {
  videoList = new BehaviorSubject<VideoItem[]>([]);
  filterKeyWords = new BehaviorSubject<string>('');

  getVideoList: Observable<VideoItem[]> = this.videoList.asObservable();
  getFilterKeyWords: Observable<string> = this.filterKeyWords.asObservable();

  constructor(
    private searchService: SearchService,
    private store: Store<AppState>
  ) {
    this.getVideoList = this.store.select(selectVideoList);
  }

  setVideoList(items: VideoItem[]): void {
    this.videoList.next(items);
  }

  setFilterKeyWords(value: string): void {
    this.filterKeyWords.next(value);
  }

  getVideoData(queryTerm: string, pageToken?: string): void {
    this.searchService.searchVideo(queryTerm, pageToken);
  }

  getVideoDetailedInformation(videoId: string): VideoItem | undefined {
    let videoInfo: VideoItem | undefined;

    this.getVideoList.subscribe((list: VideoItem[]) => {
      videoInfo = this.getVideoDetails(videoId, list);
    });
    return videoInfo;
  }

  getVideoDetails(
    videoId: string,
    videoList: VideoItem[]
  ): VideoItem | undefined {
    return videoList.find(elem => elem.id === videoId);
  }
}
