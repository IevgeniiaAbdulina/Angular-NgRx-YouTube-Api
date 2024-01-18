import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getFavoriteList } from '../redux/actions/video-api.actions';
import { AppState } from '../redux/appState.interface';
import { selectFavoriteList } from '../redux/selectors/video.selectors';
import { VideoItem } from '../shared/models/video-list-response';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  favoriteList$: Observable<VideoItem[]>;
  isFavorite: boolean;

  constructor(private store: Store<AppState>) {
    this.isFavorite = true;
    this.favoriteList$ = this.store.select(selectFavoriteList);
  }

  ngOnInit(): void {
    this.store.dispatch(getFavoriteList());
  }
}
