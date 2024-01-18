import { VideoItem } from './video-list-response';

export interface CustomCard {
  id: string;
  title: string;
  description: string;
  imageCoverLink: string;
  videoLink: string;
  creationDate: string;
  tags: string[];
}

export interface CustomVideo extends VideoItem {
  videoLink?: string;
}
