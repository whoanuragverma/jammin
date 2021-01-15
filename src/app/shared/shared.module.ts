import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { RouterModule } from '@angular/router';
import { SignOutDirective } from './sign-out.directive';

@NgModule({
  declarations: [NavComponent, DropdownComponent, SignOutDirective],
  exports: [NavComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
