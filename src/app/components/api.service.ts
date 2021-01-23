import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private base = 'https://mumbai.jammin.apis.anuragverma.codes';
  constructor(private http: HttpClient) {}
  autoComplete(query: string) {
    return this.http.get(`${this.base}/autocomplete?query=${query}`);
  }
}
