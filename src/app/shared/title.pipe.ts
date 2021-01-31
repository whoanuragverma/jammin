import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlePipe',
})
export class TitlePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value?.split(' (From')[0].replace('&amp;', '').replace('&quot', "'");
  }
}
