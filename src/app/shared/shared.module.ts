import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { RouterModule } from '@angular/router';
import { SignOutDirective } from './sign-out.directive';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PlayerComponent } from './player/player.component';
import { TimePipe } from './time.pipe';
import { SafeurlPipe } from './safeurl.pipe';

@NgModule({
  declarations: [
    NavComponent,
    DropdownComponent,
    SignOutDirective,
    SidenavComponent,
    PlayerComponent,
    TimePipe,
    SafeurlPipe,
  ],
  exports: [NavComponent, SidenavComponent, PlayerComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
