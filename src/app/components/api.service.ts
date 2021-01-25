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
  search(token: string) {
    return this.http.get(`${this.base}/search?token=${token}`);
  }
}
interface nowPlaying {
  album: string;
  album_url: string;
  artist: Array<any>;
  media: Array<any>;
  title: string;
}
