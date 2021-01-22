import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-player',
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
  public playerProgress: string = '0%';
  private icons: Array<any> = [];
  @ViewChild('source') source;
  @Input() url: string;
  @Input() media: string;
  @Input() title: string;
  @Input() artist: string;
  @Input() album: string;
  constructor() {
    this.convertToPNG = this.convertToPNG.bind(this);
  }
  shuffle() {
    this.isShuffle = !this.isShuffle;
  }
  repeat() {
    this.isRepeat = !this.isRepeat;
  }
  playPause() {
    const elem = this.source.nativeElement;
    this.isPlaying ? elem.pause() : elem.play();
    this.isPlaying = !this.isPlaying;
  }
  convertToPNG(url: string) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = url;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
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
                artist: (this.artist[0] as any).name,
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

  dragEvent(event) {
    const { left } = event.target.getBoundingClientRect();
    const width = document.querySelector('.progress').clientWidth;
    const x = event.clientX - left;
    this.playerProgress = `${(x / width) * 100}%`;
    this.source.nativeElement.currentTime =
      (x / width) * this.source.nativeElement.duration;
  }
  ngOnInit(): void {
    this.artist = eval(this.artist);
    const size = ['50x50.jpg', '150x150.jpg', '500x500.jpg'];
    size.forEach((s) =>
      this.convertToPNG(`${this.url}${s}?q=${Math.random()}`)
    );
  }
  ngAfterViewInit() {
    this.source.nativeElement.addEventListener('loadedmetadata', () => {
      this.duration = this.source.nativeElement.duration;
    });
    this.source.nativeElement.addEventListener('ended', () => {
      this.isPlaying = false;
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
