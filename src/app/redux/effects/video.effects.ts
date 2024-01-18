import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { CustomVideoService } from 'src/app/admin/services/custom-video.service';
import { FavoriteListService } from 'src/app/favorite/services/favorite-list.service';
import { CustomVideo } from 'src/app/shared/models/custom-video-interface';
import {
  VideoItem,
  VideoListResponse
} from 'src/app/shared/models/video-list-response';
import { SearchService } from 'src/app/youtube/services/search.service';
import { VideoDataService } from 'src/app/youtube/services/video-data.service';

import {
  getCustomVideoList,
  getCustomVideoListFailedAction,
  getCustomVideoListSuccess
} from '../actions/custom-video.actions';
import {
  getFavoriteList,
  getFavoriteListSuccess,
  getVideoDataAction,
  getVideoList,
  getVideoListFailure,
  getVideoListSuccess
} from '../actions/video-api.actions';

@Injectable()
export class VideoEffects {
  constructor(
    private actions$: Actions,
    private videoDataService: VideoDataService,
    private customVideoService: CustomVideoService,
    private favoriteListService: FavoriteListService,
    private searchService: SearchService
  ) {}

  getVideoData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getVideoDataAction),
      mergeMap((action: { searchValue: string; pageToken: string }) => {
        return this.searchService
          .searchVideo(action.searchValue, action.pageToken)
          .pipe(
            map((response: VideoListResponse) =>
              getVideoListSuccess({ videoList: response.items })
            ),
            catchError(() =>
              of(
                getVideoListFailure({
                  error: 'Oops, loading a youtube video files has failed.'
                })
              )
            )
          );
      })
    );
  });

  getFavoriteList$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getFavoriteList),
      mergeMap(() => {
        return this.favoriteListService.getFavoriteList.pipe(
          map((favoriteList: VideoItem[]) =>
            getFavoriteListSuccess({ favoriteList })
          ),
          catchError(() =>
            of(
              getVideoListFailure({
                error: 'Loading favorites video incorrect'
              })
            )
          )
        );
      })
    );
  });

  loadTotalVideoList$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getVideoList, getCustomVideoList),
      mergeMap(() => {
        this.videoDataService.getVideoList.pipe(
          map((videoList: VideoItem[]) => getVideoListSuccess({ videoList })),
          catchError(error => of(getVideoListFailure({ error: error.message })))
        );
        return this.customVideoService.getCustomVideoList.pipe(
          map((customVideoList: CustomVideo[]) =>
            getCustomVideoListSuccess({ customVideoList })
          ),
          catchError(error =>
            of(getCustomVideoListFailedAction({ error: error.message }))
          )
        );
      })
    );
  });
}
