import { Pipe, PipeTransform } from '@angular/core';

import { VideoItem } from '../models/video-list-response';

@Pipe({
  name: 'filteringByKeyWords'
})
export class FilteringByKeyWordsPipe implements PipeTransform {
  transform(videoList?: VideoItem[], keyWords?: string): VideoItem[] {
    if (!videoList) {
      return [];
    }

    if (!keyWords || keyWords.length === 0) {
      return videoList;
    }

    return videoList.filter(video => {
      return video.snippet.title.toLowerCase().includes(keyWords);
    });
  }
}
