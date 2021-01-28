import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DatabseService } from 'src/app/databse.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dd',
  templateUrl: './dd.component.html',
  styleUrls: ['./dd.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          maxHeight: '25vh',
          opacity: 1,
          'pointer-events': 'auto',
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          maxHeight: '0px',
          'pointer-events': 'none',
        })
      ),
      transition('* => *', [animate('0.25s ease-in-out')]),
    ]),
  ],
})
export class DdComponent implements OnInit {
  constructor(private api: ApiService, private db: DatabseService) {}
  @Input() isOpen: boolean;
  @Input() url: any;
  ngOnInit(): void {}
  addToQueue() {
    this.api.search(this.url).subscribe((data) => {
      this.db.addToQueue(data[0]);
    });
    this.isOpen = false;
  }
  playNext() {
    this.api.search(this.url).subscribe((data) => {
      this.db.playNext(data[0]);
    });
    this.isOpen = false;
  }
}
