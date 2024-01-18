import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNumber'
})
export class ShortNumberPipe implements PipeTransform {
  transform(value?: string): string {
    if (!value) return '';
    const number = Number(value);
    if (number === 0) return '0';

    let reduced = number / 1000;
    if (reduced >= 1) {
      reduced = Math.round(reduced * 10) / 10;
      return `${reduced} K`;
    }
    return value;
  }
}
