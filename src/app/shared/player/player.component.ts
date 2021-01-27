import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CacheService } from 'src/app/cache.service';
import { DatabseService } from 'src/app/databse.service';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerComponent implements OnInit {
  public isLiked: boolean = false;
  public isShuffle: boolean = false;
  public isRepeat: boolean = false;
  public isPlaying: boolean = false;
  public isBuffering: boolean = false;
  public duration: number = 0;
  public current: number = 0;
  public isFirstLoad: boolean = false;
  public playerProgress: string = '0%';
  private icons: Array<any> = [];
  @ViewChild('source') source;
  public url: string;
  public media: string;
  public title: string;
  public artist: string;
  public volume: string = '100%';
  public album: string;
  public isMute: boolean = false;
  constructor(private db: DatabseService, public cache: CacheService) {
    this.convertToPNG = this.convertToPNG.bind(this);
  }
  shuffle() {
    this.isShuffle = !this.isShuffle;
  }
  repeat() {
    this.isRepeat = !this.isRepeat;
  }
  mute() {
    this.isMute = !this.isMute;
    this.source.nativeElement.muted = this.isMute;
  }
  playPause() {
    const elem = this.source.nativeElement;
    this.isPlaying ? elem.pause() : elem.play();
    this.isPlaying = !this.isPlaying;
  }
  async convertToPNG(url: string) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = await this.cache.cacheFirst(url);
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      let art = '';
      (this.artist as any).forEach((el) => {
        art = art.concat(`${el.name}, `);
      });
      canvas.toBlob(
        (blob) => {
          this.icons.push({
            src: window.URL.createObjectURL(blob),
            sizes: url.split('-').splice(-1)[0].split('.jpg')[0],
            type: 'image/png',
          });
          if (this.icons.length == 3)
            if ('mediaSession' in navigator) {
              //@ts-ignore
              navigator.mediaSession.metadata = new MediaMetaData$({
                title: this.title,
                artist: art.slice(0, -2),
                album: this.album,
                artwork: this.icons,
              });
            }
        },
        'image/png',
        1
      );
    };
  }
  next(index) {
    this.db.nextSong(index);
  }
  dragEventVol(event) {
    const { left } = event.target.getBoundingClientRect();
    const width = document.querySelector('#volume').clientWidth;
    const x = event.clientX - left;
    this.volume = `${(x / width) * 100}%`;
    this.source.nativeElement.volume = x / width;
  }
  checkVol(vol: string) {
    const v = parseInt(vol.split('%')[0]);
    return v;
  }
  dragEvent(event) {
    const { left } = event.target.getBoundingClientRect();
    const width = document.querySelector('#progress').clientWidth;
    const x = event.clientX - left;
    this.playerProgress = `${(x / width) * 100}%`;
    this.source.nativeElement.currentTime =
      (x / width) * this.source.nativeElement.duration;
  }
  async ngOnInit(): Promise<void> {
    try {
      (navigator as any).mediaSession.setActionHandler('previoustrack', () =>
        this.next(-1)
      );
      (navigator as any).mediaSession.setActionHandler('nexttrack', () =>
        this.next(1)
      );
    } catch (error) {
      console.log(error);
    }
    (await this.db.nowPlaying()).subscribe(async (data) => {
      //@ts-ignore
      this.db.cached(data);
      this.icons = [];
      const size = ['50x50.jpg', '150x150.jpg', '500x500.jpg'];
      this.title = data?.title;
      this.album = data?.album;
      size.forEach((s) => this.convertToPNG(`${data?.url}${s}`));
      this.url = await this.cache.cacheFirst(data?.url + '150x150.jpg');
      this.artist = data?.artist;
      this.media = await this.cache.cacheFirst(data?.media['low']);
    });
    this.isFirstLoad = true;
  }
  ngAfterViewInit() {
    this.source.nativeElement.addEventListener('loadedmetadata', () => {
      this.duration = this.source.nativeElement.duration;
    });
    this.source.nativeElement.addEventListener('ended', () => {
      this.isPlaying = false;
      this.next(1);
    });
    this.source.nativeElement.addEventListener('play', () => {
      this.isPlaying = true;
    });
    this.source.nativeElement.addEventListener('waiting', () => {
      this.isBuffering = true;
    });
    this.source.nativeElement.addEventListener('playing', () => {
      this.isBuffering = false;
    });
    this.source.nativeElement.addEventListener('timeupdate', () => {
      this.current = this.source.nativeElement.currentTime;
      this.playerProgress = `${
        (this.source.nativeElement.currentTime /
          this.source.nativeElement.duration) *
        100
      }%`;
    });
  }
}
