import { Component, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  opened = false;
  @ViewChild('sidenav') sidenav!: any;
  @ViewChild('sidenavContent') sidenavContent!: any;

  @HostListener('document:click', ['$event']) onDocumentClick(event: MouseEvent) {
    event.stopPropagation();
    // If the click was outside side-menu
    if (!this.sidenav._elementRef?.nativeElement?.contains(event.target)
      && !this.sidenavContent?.elementRef?.nativeElement?.contains(event.target)) {
      this.opened = false;
    }
  }

  toggleSidenav() {
    this.opened = !this.opened;
  }

  onSelect() {
    this.opened = false;
  }
}
