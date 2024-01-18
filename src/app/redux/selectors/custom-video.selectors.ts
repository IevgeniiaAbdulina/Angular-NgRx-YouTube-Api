import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/redux/appState.interface';

import { CustomVideoState } from '../state.models';

export const selectCustomVideoState = (state: AppState) => state.customVideo;

export const selectLoadingState = createSelector(
  selectCustomVideoState,
  (state: CustomVideoState) => state.isLoading
);

export const selectCustomVideoList = createSelector(
  selectCustomVideoState,
  (state: CustomVideoState) => state.customVideoList
);

export const selectCustomVideoError = createSelector(
  selectCustomVideoState,
  (state: CustomVideoState) => state.error
);
