import {
  Component,
  Input,
  OnInit,
  SimpleChange,
  ViewEncapsulation,
} from '@angular/core';
import { CacheService } from 'src/app/cache.service';
import { DatabseService } from 'src/app/databse.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {
  @Input() data: any;
  @Input() idx: any;
  public urls = {};
  constructor(private cache: CacheService, public db: DatabseService) {}

  async process() {
    this.data?.forEach(async (element) => {
      this.urls[element.image['150x150']] = await this.cache.cacheFirst(
        `https://cdn.jammin.ml/${element.image['150x150']}`
      );
    });
    for (let i = 0; i < this.data?.length; i++) {
      let artist = [];
      this.data[i].artists.forEach((element) => {
        artist.push(
          JSON.stringify({
            name: element.name,
            url: element.url,
            image: {
              '50x50': element.image['50x50'],
              '150x150': element.image['150x150'],
              '500x500': element.image['500x500'],
            },
          })
        );
      });
      artist = [...new Set(artist)];

      let temp = [];
      artist.forEach((el) => temp.push(JSON.parse(el)));
      this.data[i].artists = temp;
    }
  }
  ngOnInit(): void {}
  ngOnChanges() {
    this.process();
  }
}
