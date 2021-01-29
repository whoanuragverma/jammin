import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatabseService } from 'src/app/databse.service';
import { SearchService } from 'src/app/search.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {
  constructor(
    public searchService: SearchService,
    private api: ApiService,
    private db: DatabseService
  ) {}
  public query: string = '';
  public result: any;
  public songPopup: any = [false, false, false];
  public history = [];
  handleChange(event) {
    this.searchService.changeData(event.target.value);
  }
  async ngOnInit(): Promise<void> {
    (await this.db.getSearch()).subscribe((data) => (this.history = data));
    this.searchService.data$.subscribe((res) => {
      this.query = res;
      if (res != '') {
        this.api.autoComplete(res).subscribe((data) => {
          this.result = data;
        });
      } else {
        this.result = undefined;
      }
    });
  }
}
