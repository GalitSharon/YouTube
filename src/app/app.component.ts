import { Component, HostListener, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Video } from './core/models/video';
import { BottomMenuComponent } from './modules/bottom-menu/bottom-menu.component';

const SCREEN_SIZE = 768;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'youtube';
  videos: Video[] = [];
  public isMobile!: boolean;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenWidth();
  }

  constructor(
    private router: Router,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.checkScreenWidth();
  }

  handleSearch(keyword: string) {
    this.router.navigate(['/results'], {
      queryParams: {
        q: keyword,
        sortKey: 'title'
      }
    });
  }

  openBottomMenu(): void {
    this._bottomSheet.open(BottomMenuComponent);
  }

  private checkScreenWidth() {
    this.isMobile = window.innerWidth < SCREEN_SIZE;
  }

}
