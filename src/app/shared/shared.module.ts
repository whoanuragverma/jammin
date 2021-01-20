import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { RouterModule } from '@angular/router';
import { SignOutDirective } from './sign-out.directive';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    NavComponent,
    DropdownComponent,
    SignOutDirective,
    SidenavComponent,
  ],
  exports: [NavComponent, SidenavComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
