import { CustomFormField } from './creation-form';

export class TitleField implements CustomFormField {
  name = 'title';
  type = 'text';
  label = 'Title';
  formControlName = 'title';
  mapedErrors = new Map([
    ['required', 'Please enter a title'],
    ['minlength', 'The title is too short'],
    ['maxlength', 'The title is too long']
  ]);
  errorKeys: string[];

  constructor() {
    this.errorKeys = [...this.mapedErrors.keys()];
  }
}
