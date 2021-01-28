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
import { TitlePipe } from './title.pipe';
import { LikeComponent } from './like/like.component';

@NgModule({
  declarations: [
    NavComponent,
    DropdownComponent,
    SignOutDirective,
    SidenavComponent,
    PlayerComponent,
    TimePipe,
    SafeurlPipe,
    TitlePipe,
    LikeComponent,
  ],
  exports: [NavComponent, SidenavComponent, PlayerComponent, LikeComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
