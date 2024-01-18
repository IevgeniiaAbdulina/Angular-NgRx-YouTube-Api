import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomVideoService } from 'src/app/admin/services/custom-video.service';
import { FavoriteListService } from 'src/app/favorite/services/favorite-list.service';
import { AppState } from 'src/app/redux/appState.interface';
import { VideoItem } from 'src/app/shared/models/video-list-response';

import {
  addToFavoriteList,
  removeFromFavoriteList
} from '../../../redux/actions/video-api.actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() videoItem?: VideoItem;
  @Input() isFavorite?: boolean;

  url: string;

  constructor(
    private customVideoService: CustomVideoService,
    private favoriteListService: FavoriteListService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.url = this.router.url;
  }

  favoriteItemHandler(item?: VideoItem) {
    if (!item) {
      return;
    }
    this.favoriteListService.addFavoriteItemToStorage(item);
    this.store.dispatch(addToFavoriteList({ favoriteItem: item }));
  }

  deleteItemHandler(item?: VideoItem) {
    if (!item) {
      return;
    }
    this.customVideoService.deleteCustomVideoItem(item);
  }

  removeFromFavoriteListHandler(item?: VideoItem) {
    if (!item) {
      return;
    }
    this.store.dispatch(removeFromFavoriteList({ favoriteItem: item }));
    this.favoriteListService.removeItemFromFavoriteList(item);
  }
}
