import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SearchService } from 'src/app/search.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {
  constructor(public searchService: SearchService, private api: ApiService) {}
  public query: string = '';
  public result: any;

  handleChange(event) {
    this.searchService.changeData(event.target.value);
  }
  ngOnInit(): void {
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
