import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { VideoListResponse } from '../../shared/models/video-list-response';
import { YoutubeService } from './youtube.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private youtubeService: YoutubeService) {}

  searchVideo(
    queryTerm: string,
    pageToken?: string
  ): Observable<VideoListResponse> {
    return this.youtubeService.searchVideoByText(queryTerm, pageToken).pipe(
      switchMap((ids: string[]) => this.youtubeService.getVideoDetails(ids)),
      map((result: VideoListResponse) => result)
    );
  }
}
