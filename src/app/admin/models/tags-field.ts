import { CustomFormField } from './creation-form';

export class TagsField implements CustomFormField {
  name = 'tags';
  type = 'text';
  label = 'Tag:';
  formControlName = 'tags';
  mapedErrors = new Map([['required', 'Please enter a tag']]);
  errorKeys: string[];

  constructor() {
    this.errorKeys = [...this.mapedErrors.keys()];
  }
}
