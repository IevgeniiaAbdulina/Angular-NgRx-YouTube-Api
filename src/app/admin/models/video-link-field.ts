import { CustomFormField } from './creation-form';

export class VideoLinkField implements CustomFormField {
  name = 'video-link';
  type = 'url';
  label = 'Video Link';
  formControlName = 'videoLink';
  mapedErrors = new Map([['required', 'Please enter a link to the video']]);
  errorKeys: string[];

  constructor() {
    this.errorKeys = [...this.mapedErrors.keys()];
  }
}
