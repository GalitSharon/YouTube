import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Video } from 'src/app/core/models/video';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent {
  @Input() videos!: Video[];
  @Input() isPlaylistDisplay!: boolean;
  @Input() isFullDisplay?: boolean;
  @Output() videoSelected = new EventEmitter<Video>();
  @Output() openSaveDialog = new EventEmitter<Video>();
  @Output() openDeleteDialog = new EventEmitter<Video>();

  constructor(public dialog: MatDialog) { }

  onSelect(selectedVideo: Video) {
    this.videoSelected.emit(selectedVideo);
  }

  openSaveModal(video: Video) {
    this.openSaveDialog.emit(video);
  }

  openDeleteModal(video: Video) {
    this.openDeleteDialog?.emit(video);
  }
}
