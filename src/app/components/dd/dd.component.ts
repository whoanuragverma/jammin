import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { DatabseService } from 'src/app/databse.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dd',
  templateUrl: './dd.component.html',
  styleUrls: ['./dd.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('plAnim', [
      state(
        'left',
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        })
      ),
      state(
        'left2',
        style({
          transform: 'translateX(0%)',
          opacity: 1,
        })
      ),
      state(
        'right',
        style({
          transform: 'translateX(0%)',
          opacity: 1,
        })
      ),
      state(
        'right2',
        style({
          transform: 'translateX(100%)',
          opacity: 0,
        })
      ),
      transition('* => *', [animate('0.25s ease-in-out')]),
    ]),
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
  public plMenu: boolean = false;
  public plList: any;
  async ngOnInit(): Promise<void> {
    this.plList = (await this.db.getPlaylist()).pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }
  addToPL(plID: string) {
    this.api.search(this.url).subscribe((data) => {
      this.db.addToPL(plID, data[0]);
    });
    this.isOpen = false;
  }
  newPL() {
    this.db.createPlaylist();
  }
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
