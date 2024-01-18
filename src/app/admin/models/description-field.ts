import { CustomFormField } from './creation-form';

export class DescriptionField implements CustomFormField {
  name = 'description';
  type = 'text';
  label = 'Description';
  formControlName = 'description';
  mapedErrors = new Map([['maxlength', 'The description is too long']]);
  errorKeys: string[];

  constructor() {
    this.errorKeys = [...this.mapedErrors.keys()];
  }
}
