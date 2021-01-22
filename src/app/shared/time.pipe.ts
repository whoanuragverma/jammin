import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    const seconds = value % 60;
    const min = (value - seconds) / 60;
    return `${min}:${
      Math.floor(seconds) < 10 ? `0${Math.floor(seconds)}` : Math.floor(seconds)
    }`;
  }
}
