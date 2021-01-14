import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'login-landing',
  templateUrl: './login-landing.component.html',
  styleUrls: ['./login-landing.component.scss'],
})
export class LoginLandingComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  public currentYear: number = new Date().getFullYear();
  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) this.router.navigate(['']);
    });
  }
}
