import { CustomFormField } from './creation-form';

export class CreationDateField implements CustomFormField {
  name = 'creation-date';
  type = 'date';
  label = 'Creation date';
  formControlName = 'creationDate';
  mapedErrors = new Map([['required', 'Please enter a creation date']]);
  errorKeys: string[];

  constructor() {
    this.errorKeys = [...this.mapedErrors.keys()];
  }
}
