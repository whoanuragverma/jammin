import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private base = 'https://api.jammin.workers.dev';
  constructor(private http: HttpClient) {}
  autoComplete(query: string) {
    return this.http.get(`${this.base}/autocomplete?query=${query}`);
  }
  search(token: string, page: number = 1) {
    return this.http.get(`${this.base}/search?token=${token}&p=${page}`);
  }
}
