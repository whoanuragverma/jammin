import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private data = new BehaviorSubject('');
  data$ = this.data.asObservable();
  changeData(data: string) {
    this.data.next(data);
  }
  constructor() {}
}
