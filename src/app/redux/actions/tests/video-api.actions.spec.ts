import { videoListMock } from '../../mocks/video.mocks';
import {
  getVideoList,
  getVideoListSuccess,
  setLoading
} from '../video-api.actions';

describe('VideoActions', () => {
  describe('SetLoading', () => {
    it('should set loading state', () => {
      const action = setLoading({ isLoading: true });

      expect(action.isLoading).toEqual(true);
      expect(action).toMatchSnapshot();
    });
  });

  describe('GetVideoList', () => {
    it('should create an action to get video list', () => {
      const expectedAction = {
        type: getVideoList.type
      };
      const action = getVideoList();

      expect(action).toEqual(expectedAction);
    });
  });

  describe('GetVideoListSuccess', () => {
    it('should create an action to get video list success', () => {
      const expectedAction = {
        type: getVideoListSuccess.type,
        videoList: videoListMock
      };
      const action = getVideoListSuccess({
        videoList: videoListMock
      });

      expect(action).toEqual(expectedAction);
    });
  });
});
