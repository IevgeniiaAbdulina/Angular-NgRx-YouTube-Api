import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FavoriteListService } from 'src/app/favorite/services/favorite-list.service';
import { getCustomVideoList } from 'src/app/redux/actions/custom-video.actions';
import { AppState } from 'src/app/redux/appState.interface';
import {
  selectLoadingState,
  selectTotalVideoList,
  selectVideoError
} from 'src/app/redux/selectors/video.selectors';
import { VideoItem } from 'src/app/shared/models/video-list-response';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private favoriteList: VideoItem[] = [];

  firstPage = '';
  keyWords = '';
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  videoList$: Observable<VideoItem[]>;
  isPaginated = true;
  isFavorite?: boolean;

  constructor(
    private store: Store<AppState>,
    private favoriteListService: FavoriteListService
  ) {
    this.isLoading$ = this.store.select(selectLoadingState);
    this.error$ = this.store.select(selectVideoError);
    this.videoList$ = this.store.select(selectTotalVideoList);
    this.store.dispatch(getCustomVideoList());

    this.subscriptions.add(
      this.videoList$.subscribe(result => {
        this.isPaginated = result.length > 19;
      })
    );
    this.subscriptions.add(
      this.favoriteListService.favoriteList.subscribe(list => {
        this.favoriteList = list;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getFavoriteStatus(id: string): boolean {
    return this.favoriteList.find(item => item.id === id) !== undefined;
  }
}
