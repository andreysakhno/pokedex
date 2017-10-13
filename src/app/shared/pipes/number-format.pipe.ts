import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'numberformat'
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number): string {
    let str: string = value.toString();
    return (str.length == 1) ? '#00' + str : '#0' + str;
  }
}
