import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { DeleteFromPlaylistModalComponent } from './delete-from-playlist-modal/delete-from-playlist-modal.component';
import { SaveToPlaylistModalComponent } from './save-to-playlist-modal/save-to-playlist-modal.component';
import { VideoDisplayComponent } from './video-display/video-display.component';
import { VideoListComponent } from './video-list/video-list.component';
  
@NgModule({
  declarations: [
    VideoListComponent,
    SaveToPlaylistModalComponent,
    DeleteFromPlaylistModalComponent,
    VideoDisplayComponent
  ],
  imports: [
    CommonModule,
    YouTubePlayerModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatMenuModule,
  ],
  exports: [
    VideoListComponent,
    SaveToPlaylistModalComponent,
    DeleteFromPlaylistModalComponent,
    VideoDisplayComponent
  ]
})
export class SharedModule { }
