import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { E404Component } from './e404/e404.component';
import { LibraryComponent } from './library/library.component';
import { LikedComponent } from './liked/liked.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { QueueComponent } from './queue/queue.component';
import { RecentsComponent } from './recents/recents.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'browse',
    component: BrowseComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'library',
    component: LibraryComponent,
  },
  {
    path: 'liked',
    component: LikedComponent,
  },
  {
    path: 'playlist',
    component: LikedComponent,
  },
  {
    path: 'queue',
    component: QueueComponent,
  },
  {
    path: 'recents',
    component: RecentsComponent,
  },
  {
    path: 'playlist/:UID/:PLID',
    component: PlaylistComponent,
  },
  {
    path: '',
    component: E404Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
