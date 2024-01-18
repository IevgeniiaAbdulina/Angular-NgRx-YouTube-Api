import { createReducer, on } from '@ngrx/store';

import {
  createCustomVideoAction,
  getCustomVideoList,
  getCustomVideoListFailedAction,
  getCustomVideoListSuccess,
  removeItemFromCustomVideoList
} from '../actions/custom-video.actions';
import { CustomVideoState } from '../state.models';

export const initialSate: CustomVideoState = {
  isLoading: false,
  customVideoList: [],
  error: null
};

export const customVideoReducers = createReducer(
  initialSate,
  on(
    getCustomVideoList,
    (state): CustomVideoState => ({
      ...state,
      isLoading: true
    })
  ),
  on(createCustomVideoAction, (state, action): CustomVideoState => {
    let customVideoState = state;
    customVideoState = {
      ...state,
      customVideoList: [...state.customVideoList, action.customVideo]
    };

    return customVideoState;
  }),
  on(removeItemFromCustomVideoList, (state, action) => {
    const items = [...state.customVideoList];
    const index = items.findIndex(item => item.id === action.customVideo.id);
    items.splice(index, 1);

    let customVideoState = state;
    customVideoState = {
      ...state,
      customVideoList: items
    };

    return customVideoState;
  }),
  on(
    getCustomVideoListSuccess,
    (state, action): CustomVideoState => ({
      ...state,
      isLoading: false,
      customVideoList: action.customVideoList
    })
  ),
  on(
    getCustomVideoListFailedAction,
    (state, action): CustomVideoState => ({
      ...state,
      isLoading: false,
      error: action.error
    })
  )
);
