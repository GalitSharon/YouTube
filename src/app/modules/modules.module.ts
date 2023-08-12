import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { ResultsComponent } from './results/results.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { VideoComponent } from './video/video.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ResultsComponent,
    HomeComponent,
    PlaylistsComponent,
    SideMenuComponent,
    SearchBarComponent,
    PlaylistComponent,
    VideoComponent,
    BottomMenuComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    YouTubePlayerModule, // check if nessecary
    SharedModule,
    MatSidenavModule,
    MatGridListModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  exports: [
    PlaylistsComponent,
    SideMenuComponent,
    SearchBarComponent,
    BottomMenuComponent
  ]
})
export class ModulesModule { }
