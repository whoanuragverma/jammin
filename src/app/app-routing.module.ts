import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { E404Component } from './components/e404/e404.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/components.module').then((m) => m.ComponentsModule),
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
