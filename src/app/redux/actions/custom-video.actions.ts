import { createAction, props } from '@ngrx/store';
import { CustomVideo } from 'src/app/shared/models/custom-video-interface';

export const getCustomVideoList = createAction(
  '[Custom Video] Get Video List Items'
);

export const createCustomVideoAction = createAction(
  '[Custom Video] Post Video Item',
  props<{ customVideo: CustomVideo }>()
);

export const removeItemFromCustomVideoList = createAction(
  '[Custom Video] Remove Item from Cudtom Video List',
  props<{ customVideo: CustomVideo }>()
);

export const getCustomVideoListSuccess = createAction(
  '[Custom Video] Get Custom Video List Success',
  props<{ customVideoList: CustomVideo[] }>()
);
export const getCustomVideoListFailedAction = createAction(
  '[Custom Video] Get Custom Video List Failure',
  props<{ error: string }>()
);
