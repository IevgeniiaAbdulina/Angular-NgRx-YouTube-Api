import { CustomVideo } from 'src/app/shared/models/custom-video-interface';
import { VideoItem } from 'src/app/shared/models/video-list-response';

import { CustomVideoState, VideoState } from '../state.models';

export const videoItemMock: VideoItem = {
  id: '123',
  snippet: {
    publishedAt: '12/2/2023',
    channelId: '',
    title: 'First mock video item',
    description: 'Test video item',
    thumbnails: {
      high: {
        url: 'assets/img/default_image.svg',
        width: 100,
        height: 150
      }
    },
    channelTitle: 'testing',
    tags: ['1'],
    categoryId: '',
    liveBroadcastContent: '',
    defaultLanguage: '',
    localized: {
      title: '',
      description: ''
    },
    defaultAudioLanguage: ''
  },
  statistics: {
    viewCount: '1',
    likeCount: '2',
    dislikeCount: '3',
    favoriteCount: '4',
    commentCount: '5'
  },
  kind: 'mockYoutube#video',
  etag: '1'
};

export const videoListMock: VideoItem[] = [videoItemMock, videoItemMock];

export const favoriteListMock: VideoItem[] = [
  videoItemMock,
  videoItemMock,
  videoItemMock
];

export const customVideoItemMock: CustomVideo = {
  id: '456',
  snippet: {
    publishedAt: '12/2/2023',
    channelId: '',
    title: 'First mock video item',
    description: 'Test video item',
    thumbnails: {
      high: {
        url: 'assets/img/default_image.svg',
        width: 100,
        height: 150
      }
    },
    channelTitle: 'testing',
    tags: ['1'],
    categoryId: '',
    liveBroadcastContent: '',
    defaultLanguage: '',
    localized: {
      title: '',
      description: ''
    },
    defaultAudioLanguage: ''
  },
  statistics: {
    viewCount: '1',
    likeCount: '2',
    dislikeCount: '3',
    favoriteCount: '4',
    commentCount: '5'
  },
  kind: 'mockCustom#video',
  etag: '1'
};

export const customVideoListMock: CustomVideo[] = [
  customVideoItemMock,
  customVideoItemMock
];

export const videoListStateMock: VideoState = {
  isLoading: false,
  videoList: videoListMock,
  favoriteList: videoListMock,
  error: ''
};

export const customVideoStateMock: CustomVideoState = {
  isLoading: false,
  customVideoList: customVideoListMock,
  error: ''
};
