import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, find, Observable, switchMap } from 'rxjs';
import { VideoItem } from 'src/app/shared/models/video-list-response';

@Injectable({
  providedIn: 'root'
})
export class FavoriteListService {
  favoriteList = new BehaviorSubject<VideoItem[]>(this.retrievedStoreData());
  getFavoriteList: Observable<VideoItem[]> = this.favoriteList.asObservable();

  constructor(private router: Router) {}

  retrievedStoreData(): VideoItem[] {
    const data: string | null = localStorage.getItem('favorite');
    if (!data || data.length === 0) {
      return [];
    }
    return JSON.parse(data) as VideoItem[];
  }

  addFavoriteItemToStorage(item: VideoItem): void {
    const retrievedData = this.getDataFromStorage();

    const alreadyExistsingItem = retrievedData.find(
      elem => elem.id === item.id
    );

    if (!alreadyExistsingItem) {
      retrievedData.unshift(item);
      localStorage.setItem('favorite', JSON.stringify(retrievedData));

      this.favoriteList.next(retrievedData);
    }
  }

  removeItemFromFavoriteList(item: VideoItem): void {
    const retrievedData = this.getDataFromStorage();
    const filteredList = retrievedData.filter(elem => elem.id !== item?.id);

    if (filteredList.length === 0) {
      this.router.navigate(['/video']);
    }

    localStorage.setItem('favorite', JSON.stringify(filteredList));

    this.favoriteList.next(filteredList);
  }

  getDataFromStorage(): VideoItem[] {
    const retrievedData: string | null =
      localStorage.getItem('favorite') ?? null;
    if (!retrievedData) {
      return [];
    }
    return JSON.parse(retrievedData);
  }

  getFavoriteVideoDetailedInfo(videoId: string): VideoItem | undefined {
    let videoInfo: VideoItem | undefined;
    this.getFavoriteList
      .pipe(
        switchMap(res => res),
        find((elem: VideoItem) => elem.id === videoId)
      )
      .subscribe((result?: VideoItem) => {
        videoInfo = result;
      })
      .unsubscribe();
    return videoInfo;
  }

  favoriteStatus(id: string): boolean | undefined {
    let isFavorite = false;
    this.getFavoriteList
      .pipe(
        switchMap(elem => elem),
        find((elem: VideoItem) => elem.id === id)
      )
      .subscribe((result?: VideoItem) => {
        if (!result) {
          isFavorite = false;
        }
        isFavorite = true;
      })
      .unsubscribe();

    return isFavorite;
  }
}
