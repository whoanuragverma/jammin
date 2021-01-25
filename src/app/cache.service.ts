import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForage } from 'ngforage';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor(
    private cache: NgForage,
    private readonly sanitizer: DomSanitizer
  ) {}
  private getItem(key) {
    // If response is NULL then we use original source and addItem to the cache
    return this.cache.getItem(key);
  }
  private setItem(key) {
    fetch(key)
      .then((res) => res.blob())
      .then((res) => this.cache.setItem(key, res));
  }
  cacheFirst(key: string): Promise<string> {
    return new Promise(async (r) => {
      const data = await this.getItem(key);
      if (data == null) {
        this.setItem(key);
        r(key);
      } else {
        r(URL.createObjectURL(data));
      }
    });
  }
}
