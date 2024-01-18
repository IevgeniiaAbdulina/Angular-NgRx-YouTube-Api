import { Observable } from 'rxjs';
import { VideoListResponse } from 'src/app/shared/models/video-list-response';

export interface InternetVideoApi {
  searchVideoByText(
    searchQuery: string,
    pageToken?: string
  ): Observable<string[]>;
  getVideoDetails(videoIds: string[]): Observable<VideoListResponse>;
}
