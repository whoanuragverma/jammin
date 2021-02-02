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

  async getImg() {
    this.data?.forEach(async (element) => {
      this.urls[element.image['150x150']] = await this.cache.cacheFirst(
        `https://cdn.jammin.workers.dev/${element.image['150x150']}`
      );
    });
  }
  ngOnInit(): void {}
  ngOnChanges() {
    this.getImg();
  }
}
