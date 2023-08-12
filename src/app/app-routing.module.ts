import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { PlaylistComponent } from './modules/playlist/playlist.component';
import { ResultsComponent } from './modules/results/results.component';
import { VideoComponent } from './modules/video/video.component';

const routes: Routes = [ 
  {
    path: '*',          
    redirectTo: '', 
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'video',
    component: VideoComponent
  },
  {
    path: 'results',
    component: ResultsComponent
  },
  {
    path: 'playlist',
    component: PlaylistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
