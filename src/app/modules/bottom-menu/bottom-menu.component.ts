import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss']
})
export class BottomMenuComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomMenuComponent>) { }

  closeSheet(): void {
    this._bottomSheetRef.dismiss();
  }
}
