import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Directive({
  selector: '[appSignOut]',
})
export class SignOutDirective {
  @HostListener('click')
  onclick() {
    this.afAuth.signOut();
  }
  constructor(private afAuth: AngularFireAuth) {}
}
