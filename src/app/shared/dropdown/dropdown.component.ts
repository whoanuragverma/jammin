import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
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
export class DropdownComponent implements OnInit {
  constructor() {}
  @Input() isOpen: boolean;
  @Input() items: any;
  ngOnInit(): void {}
}
