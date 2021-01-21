import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { E404Component } from './e404/e404.component';
import { BrowseComponent } from './browse/browse.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';
import { LibraryComponent } from './library/library.component';
import { LikedComponent } from './liked/liked.component';
import { RecentsComponent } from './recents/recents.component';


@NgModule({
  declarations: [E404Component, BrowseComponent, PlaylistComponent, SearchComponent, LibraryComponent, LikedComponent, RecentsComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule
  ]
})
export class ComponentsModule { }
