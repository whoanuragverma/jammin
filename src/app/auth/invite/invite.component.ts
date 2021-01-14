import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent implements OnInit {
  public user: any;
  public currentYear: number = new Date().getFullYear();
  constructor(private afAuth: AngularFireAuth, public router: Router) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.afAuth.currentUser;
    this.afAuth.signOut();
  }
}
