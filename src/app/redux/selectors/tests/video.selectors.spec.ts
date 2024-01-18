import { videoListStateMock } from '../../mocks/video.mocks';
import { selectLoadingState, selectVideoList } from '../video.selectors';

describe('VideoSelectors', () => {
  it('should return true when data is loading', () => {
    expect(selectLoadingState.projector(videoListStateMock)).toEqual(
      videoListStateMock.isLoading
    );
  });

  it('should return a video list', () => {
    expect(selectVideoList.projector(videoListStateMock)).toEqual(
      videoListStateMock.videoList
    );
  });
});
