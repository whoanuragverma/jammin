import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

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
  @ViewChild('source') source;
  constructor() {}
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
  dragEvent(event) {
    const { left } = event.target.getBoundingClientRect();
    const width = document.querySelector('.progress').clientWidth;
    const x = event.clientX - left;
    this.playerProgress = `${(x / width) * 100}%`;
    this.source.nativeElement.currentTime =
      (x / width) * this.source.nativeElement.duration;
  }
  ngOnInit(): void {}
  ngAfterViewInit() {
    if ('mediaSession' in navigator) {
      //@ts-ignore
      navigator.mediaSession.metadata = new MediaMetaData$({
        title: 'Yummy',
        artist: 'Justin Beiber',
        album: 'Changes',
        artwork: [
          {
            src:
              'https://cdn.jammin.workers.dev/c/522/Yummy-English-2020-20200103035142-50x50.jpg',
            sizes: '500x500',
            type: 'image/jpg',
          },
          {
            src:
              'https://cdn.jammin.workers.dev/c/522/Yummy-English-2020-20200103035142-150x150.jpg',
            sizes: '150x150',
            type: 'image/jpg',
          },
          {
            src:
              'https://cdn.jammin.workers.dev/c/522/Yummy-English-2020-20200103035142-500x500.jpg',
            sizes: '500x500',
            type: 'image/jpg',
          },
        ],
      });
    }
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
