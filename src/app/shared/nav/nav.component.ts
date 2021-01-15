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
  @Input() data: any;
  public items: any = ['account', 'profile', 'log out'];
  constructor() {}
  public isOpen: boolean = false;
  ngOnInit(): void {}
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
