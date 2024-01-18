export interface CustomVideoFormFields {
  title: CustomFormField;
  description: CustomFormField;
  imageCoverLink: CustomFormField;
  videoLink: CustomFormField;
  creationDate: CustomFormField;
  tags: CustomFormField;
}

export interface CustomFormField {
  name: string;
  type: string;
  label: string;
  formControlName: string;
  mapedErrors: Map<string, string> | null;
  errorKeys: string[];
}
