import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxArtist',
})
export class MaxArtistPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const artist = value.split(', ');
    let data = value;
    if (artist.length > 2) {
      data = `${artist[0]}, ${artist[1]} and others`;
    }
    return data;
  }
}
