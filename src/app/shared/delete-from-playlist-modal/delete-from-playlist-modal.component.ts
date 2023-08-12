
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-from-playlist-modal',
  templateUrl: './delete-from-playlist-modal.component.html',
  styleUrls: ['./delete-from-playlist-modal.component.scss']
})
export class DeleteFromPlaylistModalComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteFromPlaylistModalComponent>,
  ) { }

  onDelete() {
    this.dialogRef.close({ status: 'delete' });
  }

  onCancel() {
    this.dialogRef.close({ status: 'cancel' });
  }
}
