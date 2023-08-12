import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { PlaylistsService } from 'src/app/core/services/playlists.service';
import { YoutubeService } from 'src/app/core/services/youtube.service';
import { SaveToPlaylistModalComponent } from 'src/app/shared/save-to-playlist-modal/save-to-playlist-modal.component';
import { Video } from '../../core/models/video';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnDestroy {
  videos!: Video[];
  selectedVideo!: Video;
  private subscription!: Subscription;

  constructor(
    private playlistsService: PlaylistsService,
    private youtubeService: YoutubeService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const subscription = this.route.queryParams.pipe(
      switchMap(params => {
        const videoId = params['id'] ? params['id'] : null;
        return this.youtubeService.getVideos([videoId]);
      }),
      switchMap(res => {
        this.selectedVideo = { ...res[0] };
        return this.youtubeService.searchVideos(res[0].title.substring(0, 5), 'title');
      })
    ).subscribe(res => {
      this.videos = res;
    });

    this.subscription = subscription;
  }

  handleVideoSelect(video: Video) {
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
    dialogRef.afterClosed().subscribe(result => {
      if (result.status === 'saved') {
        const playlistIds = result.data;
        this.playlistsService.addVideo(playlistIds, video.id, video.thumbnails.default.url)
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
