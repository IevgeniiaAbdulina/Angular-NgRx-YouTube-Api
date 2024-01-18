import { createAction, props } from '@ngrx/store';
import { VideoItem } from 'src/app/shared/models/video-list-response';

export const getVideoList = createAction('[Video List] Get Video List');
export const setLoading = createAction(
  '[Video List] Get Loading State',
  props<{ isLoading: boolean }>()
);

export const getVideoDataAction = createAction(
  '[Video List] Get Video Data',
  props<{ searchValue: string; pageToken: string }>()
);

export const getVideoListSuccess = createAction(
  '[Video List] Get Video List Success',
  props<{ videoList: VideoItem[] }>()
);

export const getVideoListFailure = createAction(
  '[Video List] Get Video List Failure',
  props<{ error: string }>()
);

export const getFavoriteList = createAction(
  '[Favorite List] Get Favorite List'
);

export const getFavoriteListSuccess = createAction(
  '[Favorite List] Get Favorite List Success',
  props<{ favoriteList: VideoItem[] }>()
);

export const addToFavoriteList = createAction(
  '[Add Favorite] Add Favorite Video',
  props<{ favoriteItem: VideoItem }>()
);

export const removeFromFavoriteList = createAction(
  '[Remove Favorite] Remove Favorite Video',
  props<{ favoriteItem: VideoItem }>()
);
