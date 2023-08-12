import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() searchUpdated = new EventEmitter<any>()

  updateSearchKeyword(keyword: any) {
    this.searchUpdated.emit(keyword);
  }
}
