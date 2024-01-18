import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomVideoService } from 'src/app/admin/services/custom-video.service';
import { FavoriteListService } from 'src/app/favorite/services/favorite-list.service';
import { removeItemFromCustomVideoList } from 'src/app/redux/actions/custom-video.actions';
import { VideoItem } from 'src/app/shared/models/video-list-response';

import {
  addToFavoriteList,
  removeFromFavoriteList
} from '../../../redux/actions/video-api.actions';
import { VideoDataService } from '../../services/video-data.service';

@Component({
  selector: 'app-detailed-information-page',
  templateUrl: './detailed-information.component.html',
  styleUrls: ['./detailed-information.component.scss']
})
export class DetailedInformationComponent implements OnInit {
  videoItem?: VideoItem;
  isFavorite?: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private videoDataService: VideoDataService,
    private customVideoService: CustomVideoService,
    private favoriteListService: FavoriteListService,
    private store: Store
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (!itemId) {
      this.router.navigate(['/video'], { skipLocationChange: true });
      return;
    }

    this.videoItem = this.videoDataService.getVideoDetailedInformation(itemId);

    if (!this.videoItem) {
      this.videoItem = this.customVideoService.getCustomVideoInfo(itemId);
    }

    if (!this.videoItem) {
      this.videoItem =
        this.favoriteListService.getFavoriteVideoDetailedInfo(itemId);
    }

    if (!this.videoItem) {
      this.router.navigate(['/404'], { skipLocationChange: true });
    }
  }

  backButtonHandler(): void {
    this.location.back();
  }

  getFavoriteStatus(id?: string): boolean | undefined {
    if (!id) {
      return false;
    }
    return this.favoriteListService.favoriteStatus(id);
  }

  favoriteItemHandler(item?: VideoItem) {
    if (!item) {
      return;
    }
    this.favoriteListService.addFavoriteItemToStorage(item);
    this.store.dispatch(addToFavoriteList({ favoriteItem: item }));
  }

  removeFromFavoriteListHandler(item?: VideoItem) {
    if (!item) {
      return;
    }
    this.store.dispatch(removeFromFavoriteList({ favoriteItem: item }));

    this.favoriteListService.removeItemFromFavoriteList(item);
    this.backButtonHandler();
  }

  deleteItemHandler(item?: VideoItem): void {
    if (!item) {
      return;
    }
    this.store.dispatch(removeItemFromCustomVideoList({ customVideo: item }));
  }
}
