import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  async canActivate(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    const isLoggedIn = !!user;
    if (!isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    if (isLoggedIn && !environment.allowedUsers.includes(user.uid)) {
      this.router.navigate(['login', 'invite']);
      return false;
    }
    return true;
  }
}
