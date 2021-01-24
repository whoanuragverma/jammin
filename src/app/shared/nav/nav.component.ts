import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'navbar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('rotate', [
      state(
        'down',
        style({
          transform: 'rotate(0)',
        })
      ),
      state(
        'up',
        style({
          transform: 'rotate(180deg)',
        })
      ),
      transition('* => *', [animate('0.2s')]),
    ]),
  ],
})
export class NavComponent implements OnInit {
  public data: any;
  public search: string = '';
  constructor(
    private afAuth: AngularFireAuth,
    private searchService: SearchService
  ) {}
  public items: any = ['account', 'profile', 'log out'];
  public isOpen: boolean = false;
  async ngOnInit(): Promise<void> {
    this.data = await this.afAuth.currentUser;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
  handleKey(event) {
    this.search = event.target.value;
    this.searchService.changeData(this.search);
  }
}
