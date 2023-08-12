import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DataOptions {
  options: DataOption[]
}

interface DataOption {
  id: string;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-save-to-playlist-modal',
  templateUrl: './save-to-playlist-modal.component.html',
  styleUrls: ['./save-to-playlist-modal.component.scss']
})
export class SaveToPlaylistModalComponent {
  checkedItems = new Set<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataOptions,
    private dialogRef: MatDialogRef<SaveToPlaylistModalComponent>,
  ) { }

  onSave() {
    const selectedPlaylistIds = [...this.checkedItems];
    this.dialogRef.close({ status: 'saved', data: selectedPlaylistIds });
  }

  onCancel() {
    this.dialogRef.close({ status: 'cancel' });
  }

  toggleChecked(dataOption: DataOption) {
    dataOption.completed = !dataOption.completed;
    if (this.checkedItems.has(dataOption.id)) {
      this.checkedItems.delete(dataOption.id);
    } else {
      this.checkedItems.add(dataOption.id);
    }
  }
}
