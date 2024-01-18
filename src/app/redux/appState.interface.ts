import { CustomVideoState, VideoState } from 'src/app/redux/state.models';

export interface AppState {
  video: VideoState;
  customVideo: CustomVideoState;
}
