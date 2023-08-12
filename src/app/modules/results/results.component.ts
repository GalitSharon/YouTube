import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Subscription, switchMap } from 'rxjs';
import { Video } from 'src/app/core/models/video';
import { PlaylistsService } from 'src/app/core/services/playlists.service';
import { YoutubeService } from 'src/app/core/services/youtube.service';
import { SaveToPlaylistModalComponent } from 'src/app/shared/save-to-playlist-modal/save-to-playlist-modal.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnDestroy, OnInit {
  videos!: Video[];
  sortOptions = ['title', 'date', 'viewCount', 'relevance', 'videoCount'];
  totalItems: number = 30;
  itemsPerPage: number = 5;
  currentPage: number = 0;
  currentData!: Video[];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  private subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private playlistsService: PlaylistsService,
    private youtubeService: YoutubeService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    const subscription = this.route.queryParams.pipe(
      switchMap(params => {
        const keyword = params['q'] || '';
        const sortKey = params['sortKey'] || 'title';
        return this.youtubeService.searchVideos(keyword, sortKey);
      }),
      catchError(error => {
        console.error('Error searching videos:', error);
        return EMPTY;
      })
    ).subscribe(res => {
      this.videos = res;
      this.updateDisplayedData();
    });

    this.subscriptions.push(subscription);
  }

  handleSortResults(event: any) {
    const subscription = this.route.queryParams.subscribe(params => {
      this.router.navigate(['/results'], {
        queryParams: {
          q: params['q'],
          sortKey: event.value
        }
      });
    });

    this.subscriptions.push(subscription);
  }

  handleVideoSelect(video: any) {
    this.router.navigate(['/video'], {
      queryParams: {
        id: video.id
      }
    });
  }

  openSaveDialog(video: Video) {
    const dialogConfig = {
      data: {
        options: this.playlistsService.getPlaylists()
          .map(pls => ({ id: pls.id, title: pls.title })),
      }
    };
    const dialogRef = this.dialog.open(SaveToPlaylistModalComponent, dialogConfig);
    const subscription = dialogRef.afterClosed().subscribe(result => {
      if (result.status === 'saved') {
        const playlistIds = result.data;
        this.playlistsService.addVideo(playlistIds, video?.id, video?.thumbnails?.default?.url)
      }
    });

    this.subscriptions.push(subscription);
  }

  onPageChange(event: PageEvent) {
    this.itemsPerPage = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updateDisplayedData();
  }

  private updateDisplayedData() {
    const startIndex = this.currentPage * this.itemsPerPage;
    this.currentData = this.videos?.length ? this.videos.slice(startIndex, startIndex + this.itemsPerPage) : [];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
