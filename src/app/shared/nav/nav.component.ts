import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-nav',
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
  constructor(private afAuth: AngularFireAuth) {}
  public items: any = ['account', 'profile', 'log out'];
  public isOpen: boolean = false;
  async ngOnInit(): Promise<void> {
    this.data = await this.afAuth.currentUser;
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
