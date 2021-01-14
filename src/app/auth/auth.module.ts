import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginLandingComponent } from './login-landing/login-landing.component';
import { GoogleSignInDirective } from './google-sign-in.directive';
import { InviteComponent } from './invite/invite.component';


@NgModule({
  declarations: [LoginLandingComponent, GoogleSignInDirective, InviteComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
