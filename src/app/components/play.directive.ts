import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { DatabseService } from '../databse.service';
import { ApiService } from './api.service';

@Directive({
  selector: '[PlayThis]',
})
export class PlayDirective {
  @Input() url: string;
  constructor(private api: ApiService, private db: DatabseService) {}
  @HostListener('click')
  onClick() {
    if (this.url.includes('song')) {
      // Normal Call and update firebase
      this.api.search(this.url).subscribe((data) => {
        const { title, album, album_url, explicit } = data[0] as any;
        let artist = [];
        data[0]?.artists.forEach((element) => {
          if (artist.length < 3)
            artist.push({
              name: element?.name,
              url: element?.url.split('/')[1],
            });
        });
        let temp = [];
        artist.forEach((el) => temp.push(JSON.stringify(el)));
        temp = [...new Set(temp)];
        artist = [];
        temp.forEach((el) => artist.push(JSON.parse(el)));
        let media = {};
        Object.keys(data[0]?.media).forEach((element) => {
          media[
            element
          ] = `https://cdn.jammin.workers.dev/${data[0]?.media[element]}`;
        });
        const url = `https://cdn.jammin.workers.dev/${
          data[0]?.image['50x50'].split('50x50.jpg')[0]
        }`;
        this.db.setNowPlaying({
          title,
          album,
          album_url,
          artist,
          media,
          explicit,
          url,
        });
      });
    }
  }
}
