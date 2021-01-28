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
  async onClick() {
    if (this.url.includes('song')) {
      this.api.search(this.url).subscribe((data) => {
        this.db.newQueue([data[0]]);
      });
    } else if (this.url.includes('album')) {
      // We need to fetch all songs in the current list
      let page = 0;
      let results = [];
      let total = 0;
      do {
        const r = await this.api.search(this.url, page).toPromise();
        if (total == 0) total = parseInt(r['total']);
        results.push(...r['results']);
        page += 1;
      } while (results.length <= total);
      this.db.newQueue(results.slice(0, results.length / 2));
    } else if (this.url.includes('playlist')) {
      alert('COMING SOON');
    } else {
      let results = [];
      const r = await this.api.search(this.url).toPromise();
      results.push(...r['songs']);
      this.db.newQueue(results);
    }
  }
}
