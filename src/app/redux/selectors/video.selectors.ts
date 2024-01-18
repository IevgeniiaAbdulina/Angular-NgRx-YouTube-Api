import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/redux/appState.interface';

import { CustomVideoState, VideoState } from '../state.models';

export const selectVideoState = (state: AppState) => state.video;
export const selectCustomVideoState = (state: AppState) => state.customVideo;

export const selectLoadingState = createSelector(
  selectVideoState,
  (state: VideoState) => state.isLoading
);

export const selectVideoData = createSelector(
  selectVideoState,
  (state: VideoState) => state.videoList
);

export const selectVideoList = createSelector(
  selectVideoState,
  (state: VideoState) => state.videoList
);

export const selectVideoError = createSelector(
  selectVideoState,
  (state: VideoState) => state.error
);

export const selectFavoriteList = createSelector(
  selectVideoState,
  (state: VideoState) => state.favoriteList
);

export const selectTotalVideoList = createSelector(
  selectCustomVideoState,
  selectVideoState,
  (customVideo: CustomVideoState, video: VideoState) =>
    customVideo.customVideoList.concat(video.videoList)
);
