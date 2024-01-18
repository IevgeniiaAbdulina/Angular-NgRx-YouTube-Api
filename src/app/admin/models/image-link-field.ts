import { CustomFormField } from './creation-form';

export class ImageCoverLinkField implements CustomFormField {
  name = 'image-cover';
  type = 'url';
  label = 'Image Cover Link';
  formControlName = 'imageCoverLink';
  mapedErrors = new Map([['required', 'Please enter a link to the image']]);
  errorKeys: string[];

  constructor() {
    this.errorKeys = [...this.mapedErrors.keys()];
  }
}
