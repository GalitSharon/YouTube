import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, Subscription, switchMap } from 'rxjs';
import { Playlist } from 'src/app/core/models/playlist';
import { PlaylistsService } from 'src/app/core/services/playlists.service';
import { YoutubeService } from 'src/app/core/services/youtube.service';
import { DeleteFromPlaylistModalComponent } from 'src/app/shared/delete-from-playlist-modal/delete-from-playlist-modal.component';
import { SaveToPlaylistModalComponent } from 'src/app/shared/save-to-playlist-modal/save-to-playlist-modal.component';
import { Video } from '../../core/models/video';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {
  playlist!: Playlist;
  videos!: Video[];
  selectedVideo!: Video;
  private subscriptions: Subscription[] = [];

  constructor(
    private playlistsService: PlaylistsService,
    private youtubeService: YoutubeService,
    private route: ActivatedRoute,
    public dialog: MatDialog,

  ) {

  }

  ngOnInit() {
    this.subscribeToPlaylistChange();
    this.subscribeToVideosChange();
  }


  /**
  * Listen to new playlist selection
  */
  subscribeToPlaylistChange() {
    const subscription = this.route.queryParams.pipe(
      switchMap(params => {
        let playlistId = params['id'] ? params['id'] : null;
        const playlists = this.playlistsService.getPlaylists();
        this.playlist = playlists.find((pls: Playlist) => pls.id === playlistId) as Playlist;
        if (this.playlist?.videos) {
          return this.youtubeService.getVideos(this.playlist?.videos);
        }
        return of([]);
      }),
      catchError(error => {
        console.error("Error fetching videos: ", error);
        return of([]);
      })
    ).subscribe(res => {
      this.videos = res;
      this.selectedVideo = res.length ? res[0] : { ...this.selectedVideo, id: '' };
    });

    this.subscriptions.push(subscription);
  }


  /**
   * Listent to playlist.videos changes (add/remove video from playlist)
   * The playlist itself doesn't change
   */
  subscribeToVideosChange() {
    const subscription = this.playlistsService.playlists$.pipe(
      switchMap(playlists => {
        this.playlist = playlists.find((pls: Playlist) => pls.id === this.playlist?.id) as Playlist;
        return this.youtubeService.getVideos(this.playlist?.videos);
      }),
      catchError(error => {
        console.error("Error fetching videos: ", error);
        return of([]);
      })
    ).subscribe(videos => {
      this.videos = videos ? videos : [];
      if (!this.videos.length) {
        this.selectedVideo = { ...this.selectedVideo, id: '' }
      } else {
        const isSelectedVideoDeleted = !this.videos.map(video => video.id).includes(this.selectedVideo?.id);
        if (isSelectedVideoDeleted) {
          this.selectedVideo = this.videos[0];
        }
      }
    });

    this.subscriptions.push(subscription);
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

  openDeleteDialog(video: Video) {
    const dialogRef = this.dialog.open(DeleteFromPlaylistModalComponent);
    const subscription = dialogRef.afterClosed().subscribe(result => {
      if (result.status === 'delete') {
        if (this.playlist.videos.length === 1) {
          this.playlistsService.removeVideo(this.playlist?.id, video?.id);
          return;
        }
        // if the video index to remove is 0, then fetch the next video to display playlist thumbnail,
        // else, fetch the first video thumbnail in the playlist.videos
        const videoIndex = this.playlist.videos.indexOf(video?.id) ? 0 : 1;
        this.youtubeService.getVideos([this.playlist.videos[videoIndex]])
          .subscribe(res => {
            const thumbnail = res[0].thumbnails?.default?.url;
            this.playlistsService.removeVideo(this.playlist?.id, video?.id, thumbnail);
          })
      }
    });
    
    this.subscriptions.push(subscription);
  }

  handleVideoSelect(video: Video) {
    this.selectedVideo = video;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
