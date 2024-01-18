import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  SearchListResponse,
  SearchResultItem,
  VideoListResponse
} from 'src/app/shared/models/video-list-response';

import { InternetVideoApi } from './remote-video-api';
import { SessionData } from './session-data';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService implements InternetVideoApi {
  constructor(private http: HttpClient) {}

  searchVideoByText(term: string, pageToken?: string): Observable<string[]> {
    return this.http
      .get<SearchListResponse>('search', {
        params: {
          q: term,
          part: 'snippet',
          type: 'video',
          maxResults: 20,
          pageToken: pageToken ?? ''
        }
      })
      .pipe(
        map((response: SearchListResponse) => {
          SessionData.nextPageToken = response.nextPageToken;
          SessionData.prevPageToken = response.prevPageToken ?? '';
          SessionData.pageToken = pageToken ?? '';

          SessionData.queryTerm = term;

          return response.items.map(
            (innerItem: SearchResultItem) => innerItem.id.videoId
          );
        })
      );
  }

  getVideoDetails(ids: string[]): Observable<VideoListResponse> {
    return this.http.get<VideoListResponse>('videos', {
      params: {
        part: 'snippet, statistics',
        id: ids.join(',')
      }
    });
  }
}
