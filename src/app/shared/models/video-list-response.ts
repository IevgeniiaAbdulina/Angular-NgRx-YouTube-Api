interface SearchResponse {
  kind: string;
  etag: string;
}

interface ResultListResponse extends SearchResponse {
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface VideoItem extends SearchResponse {
  id: string;
  snippet: VideoSnippet;
  statistics: VideoStatistics;
}

export interface VideoThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface VideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default?: VideoThumbnail;
    medium?: VideoThumbnail;
    high: VideoThumbnail;
    standard?: VideoThumbnail;
    maxres?: VideoThumbnail;
  };
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  defaultLanguage?: string;
  localized: {
    title: string;
    description: string;
  };
  defaultAudioLanguage: string;
}

export interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface SearchResultItemId {
  kind: string;
  videoId: string;
}

export interface SearchResultItem extends SearchResponse {
  id: SearchResultItemId;
  snippet: VideoSnippet;
}

export interface SearchListResponse extends ResultListResponse {
  nextPageToken: string;
  prevPageToken?: string;
  regionCode: string;
  items: SearchResultItem[];
}

export interface VideoListResponse extends ResultListResponse {
  items: VideoItem[];
}
