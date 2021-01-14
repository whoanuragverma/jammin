import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss'],
})
export class LandingHomeComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.afAuth.user.subscribe((user) => {
      if (!user) {
        this.router.navigate(['login']);
      }
    });
  }
}
