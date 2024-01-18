import { Injectable } from '@angular/core';
import { CustomCard } from 'src/app/shared/models/custom-video-interface';
import {
  VideoItem,
  VideoSnippet,
  VideoStatistics,
  VideoThumbnail
} from 'src/app/shared/models/video-list-response';

@Injectable({
  providedIn: 'root'
})
export class DataConverter {
  static toVideoItem(customVideo: CustomCard): VideoItem {
    const videoSnippet = {
      publishedAt: customVideo.creationDate,
      channelId: '',
      title: customVideo.title,
      description: customVideo.description,
      thumbnails: {
        high: {
          url: customVideo.imageCoverLink,
          width: 480,
          height: 360
        } as VideoThumbnail
      },
      channelTitle: '',
      tags: customVideo.tags,
      categoryId: '',
      liveBroadcastContent: '',
      defaultLanguage: '',
      localized: {
        title: '',
        description: ''
      },
      defaultAudioLanguage: ''
    } as VideoSnippet;

    const statistics = {
      viewCount: '',
      likeCount: '',
      dislikeCount: '',
      favoriteCount: '',
      commentCount: ''
    } as VideoStatistics;

    return {
      kind: 'custom#video',
      etag: '',
      id: customVideo.id,
      snippet: videoSnippet,
      statistics
    } as VideoItem;
  }
}
