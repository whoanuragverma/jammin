import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InviteComponent } from './invite/invite.component';
import { LoginLandingComponent } from './login-landing/login-landing.component';

const routes: Routes = [
  {
    path: '',
    component: LoginLandingComponent,
  },
  {
    path: 'invite',
    component: InviteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
