import { Pipe, PipeTransform } from '@angular/core';

import { CustomFormField } from '../models/creation-form';

@Pipe({
  name: 'objToArr'
})
export class ObjToArrayPipe implements PipeTransform {
  transform(object: object): CustomFormField[] {
    return Object.values(object);
  }
}
