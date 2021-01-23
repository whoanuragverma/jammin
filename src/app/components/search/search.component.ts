import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/search.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private searchService: SearchService, private api: ApiService) {}
  public query: string = '';
  public result: any;
  ngOnInit(): void {
    this.searchService.data$.subscribe((res) => {
      this.query = res;
      if (res != '') {
        this.api.autoComplete(res).subscribe((data) => (this.result = data));
      }
    });
  }
}
