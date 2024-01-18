import { CustomVideo } from '../shared/models/custom-video-interface';
import { VideoItem } from '../shared/models/video-list-response';

export interface VideoState {
  isLoading: boolean;
  videoList: VideoItem[];
  favoriteList: VideoItem[];
  error: string | null;
}

export interface CustomVideoState {
  isLoading: boolean;
  customVideoList: CustomVideo[];
  error: string | null;
}
