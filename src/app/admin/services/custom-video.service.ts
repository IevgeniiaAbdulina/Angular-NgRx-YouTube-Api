import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, find, Observable, switchMap } from 'rxjs';
import { CustomVideo } from 'src/app/shared/models/custom-video-interface';
import { VideoItem } from 'src/app/shared/models/video-list-response';
import { VideoDataService } from 'src/app/youtube/services/video-data.service';

import { removeItemFromCustomVideoList } from '../../redux/actions/custom-video.actions';

@Injectable({
  providedIn: 'root'
})
export class CustomVideoService {
  videoApiData = inject(VideoDataService);

  customVideoList = new BehaviorSubject<VideoItem[]>(
    this.checkDataFromStorage<VideoItem>()
  );
  getCustomVideoList: Observable<VideoItem[]> =
    this.customVideoList.asObservable();

  constructor(
    private router: Router,
    private store: Store
  ) {}

  checkDataFromStorage<T>(): T[] {
    const data: string | null = localStorage.getItem('customVideoList');
    if (!data || data.length === 0) {
      return [];
    }
    return JSON.parse(data) as T[];
  }

  setCustomVideoList(items: VideoItem[]) {
    this.customVideoList.next(items);
  }

  getCustomVideoListFromStorage(): void {
    const storageData: string | null = localStorage.getItem('customVideoList');
    if (!storageData) {
      return;
    }
    const data: CustomVideo[] = JSON.parse(storageData);
    this.setCustomVideoList(data);
  }

  searchCustomVideoByKeyword(keyword: string): void {
    let list: VideoItem[] = [];
    this.getCustomVideoList.subscribe((result: VideoItem[]) => {
      list = result.filter((item: VideoItem) =>
        item.snippet.title.toLowerCase().includes(keyword)
      );
    });
    this.customVideoList.next(list);
  }

  getCustomVideoInfo(id: string): VideoItem | undefined {
    let info: VideoItem | undefined;
    this.getCustomVideoList
      .pipe(
        switchMap((res: VideoItem[]) => res),
        find((elem: VideoItem) => elem.id === id)
      )
      .subscribe(result => {
        info = result;
      })
      .unsubscribe();
    return info;
  }

  deleteCustomVideoItem(item: VideoItem): void {
    this.store.dispatch(removeItemFromCustomVideoList({ customVideo: item }));

    let itemList: VideoItem[] = [];
    this.getCustomVideoList.subscribe((result: VideoItem[]) => {
      itemList = result.filter((data: VideoItem) => data.id !== item.id);
      localStorage.setItem('customVideoList', JSON.stringify(itemList));
    });
    this.customVideoList.next(itemList);
    this.router.navigate(['/video']);
  }

  generateCustomVideoId(): string {
    const generatedId =
      Date.now().toString(36) + Math.floor(Math.random() * 100000).toString(36);

    return `id${generatedId}`;
  }

  saveCustomVideoListInStorage(videoItem: CustomVideo): void {
    const retrievedData: string | null =
      localStorage.getItem('customVideoList');

    if (!retrievedData) {
      const list: CustomVideo[] = [videoItem];
      localStorage.setItem('customVideoList', JSON.stringify(list));
    } else {
      const data: CustomVideo[] = JSON.parse(retrievedData);
      data.unshift(videoItem);

      localStorage.setItem('customVideoList', JSON.stringify(data));

      this.setCustomVideoList(data);
    }
  }
}
