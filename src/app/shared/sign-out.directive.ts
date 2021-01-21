import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Directive({
  selector: '[appSignOut]',
})
export class SignOutDirective {
  @HostListener('click')
  onclick() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
}
