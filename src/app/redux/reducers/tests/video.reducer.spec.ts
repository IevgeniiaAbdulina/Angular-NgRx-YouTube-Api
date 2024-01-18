import {
  addToFavoriteList,
  getFavoriteList,
  getFavoriteListSuccess,
  getVideoList,
  getVideoListFailure,
  getVideoListSuccess,
  removeFromFavoriteList,
  setLoading
} from '../../actions/video-api.actions';
import { videoItemMock, videoListMock } from '../../mocks/video.mocks';
import { VideoState } from '../../state.models';
import { initialSate, reducers } from '../video.reducer';

describe('Video Reducer', () => {
  let initialVideoState: VideoState;

  beforeEach(() => {
    initialVideoState = { ...initialSate };
  });

  it('should set isLoading state to true on loading page first time', () => {
    const result = reducers(initialSate, setLoading({ isLoading: true }));

    expect(result.isLoading).toEqual(true);
    expect(result).toMatchSnapshot();
  });

  it('should set loading flag to false on getVideoList action', () => {
    const result = reducers(initialVideoState, getVideoList());

    expect(result).toEqual({
      isLoading: false,
      videoList: [],
      favoriteList: [],
      error: null
    });
  });

  it('should save received data to store and set loading flag to false on getVideoListSuccess action', () => {
    const result = reducers(
      initialSate,
      getVideoListSuccess({
        videoList: videoListMock
      })
    );

    expect(result).toEqual({
      isLoading: false,
      videoList: videoListMock,
      favoriteList: [],
      error: null
    });
  });

  it('[Video List] Get Video List Failure', () => {
    const error = 'error';
    const action = getVideoListFailure({ error });

    const expectedState: VideoState = {
      ...initialSate,
      error
    };

    const result = reducers(initialSate, action);

    expect(result).toEqual(expectedState);
  });

  it('should change state when getFavoriteList', () => {
    const result = reducers(initialSate, getFavoriteList());

    expect(result).toEqual({
      isLoading: true,
      videoList: [],
      favoriteList: [],
      error: null
    });
  });

  it('should change state when getFavoriteListSuccess', () => {
    const result = reducers(
      initialSate,
      getFavoriteListSuccess({
        favoriteList: videoListMock
      })
    );

    expect(result).toEqual({
      isLoading: false,
      videoList: [],
      favoriteList: videoListMock,
      error: null
    });
  });

  describe('[Add Favorite] Add Favorite Video', () => {
    it('should change state when item has been added to favorite video list', () => {
      const result = reducers(
        initialSate,
        addToFavoriteList({
          favoriteItem: videoItemMock
        })
      );

      expect(result).toEqual({
        ...initialSate,
        favoriteList: [videoItemMock]
      });
    });
  });

  describe('[Remove Favorite] Remove Favorite Video', () => {
    it('should change state when item has been removed from favorite video list', () => {
      const result = reducers(
        initialSate,
        removeFromFavoriteList({
          favoriteItem: videoItemMock
        })
      );

      expect(result).toEqual({
        ...initialSate,
        favoriteList: []
      });
    });
  });
});
