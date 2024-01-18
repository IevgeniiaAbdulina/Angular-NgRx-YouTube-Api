import { createReducer, on } from '@ngrx/store';

import {
  addToFavoriteList,
  getFavoriteList,
  getFavoriteListSuccess,
  getVideoDataAction,
  getVideoList,
  getVideoListFailure,
  getVideoListSuccess,
  removeFromFavoriteList,
  setLoading
} from '../actions/video-api.actions';
import { VideoState } from '../state.models';

export const initialSate: VideoState = {
  isLoading: false,
  videoList: [],
  favoriteList: [],
  error: null
};

export const reducers = createReducer(
  initialSate,
  on(
    setLoading,
    (state, { isLoading }): VideoState => ({
      ...state,
      isLoading
    })
  ),
  on(
    getVideoDataAction,
    (state): VideoState => ({
      ...state
    })
  ),
  on(
    getVideoList,
    (state): VideoState => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getVideoListSuccess,
    (state, action): VideoState => ({
      ...state,
      isLoading: false,
      videoList: action.videoList
    })
  ),
  on(
    getVideoListFailure,
    (state, action): VideoState => ({
      ...state,
      isLoading: false,
      error: action.error
    })
  ),
  on(
    getFavoriteList,
    (state): VideoState => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getFavoriteListSuccess,
    (state, action): VideoState => ({
      ...state,
      isLoading: false,
      favoriteList: action.favoriteList
    })
  ),
  on(addToFavoriteList, (state, action): VideoState => {
    let favoriteListState = state;
    favoriteListState = {
      ...state,
      isLoading: false,
      favoriteList: [...state.favoriteList, action.favoriteItem]
    };
    return favoriteListState;
  }),
  on(removeFromFavoriteList, (state, action) => {
    const items = [...state.favoriteList];
    const index = items.findIndex(item => item.id === action.favoriteItem.id);
    items.splice(index, 1);

    let favoriteListState = state;
    favoriteListState = {
      ...state,
      favoriteList: items
    };

    return favoriteListState;
  })
);
