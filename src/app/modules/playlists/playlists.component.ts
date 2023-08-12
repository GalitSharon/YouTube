import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Subscription } from 'rxjs';
import { Playlist } from 'src/app/core/models/playlist';
import { PlaylistsService } from 'src/app/core/services/playlists.service';
import { DeleteFromPlaylistModalComponent } from 'src/app/shared/delete-from-playlist-modal/delete-from-playlist-modal.component';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  @Output() onSelect = new EventEmitter();
  playlists!: Playlist[];
  isCreatePlaylist = false;
  isPlaylistDisplay!: boolean;
  selectedPlaylistId!: string;
  private subscriptions: Subscription[] = [];

  createPlaylistGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(
    private playlistsService: PlaylistsService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,

  ) { }

  ngOnInit() {
    const subscription = this.playlistsService.playlists$.pipe(
      catchError(error => {
        console.error('Error fetching playlists:', error);
        return EMPTY;
      })
    ).subscribe(playlists => {
      this.playlists = playlists;
    });

    this.subscriptions.push(subscription);
  }

  handlePlaylistSelect(playlist: any) {
    this.router.navigate(['/playlist'], {
      queryParams: {
        id: playlist.id
      }
    });
    this.onSelect.emit();
  }

  onNameSubmit() {
    if (this.createPlaylistGroup.valid) {
      this.createPlaylist(String(this.createPlaylistGroup.value.name));
    } else {
      this._snackBar.open('invalid playlist name', 'Close', { duration: 3000 });
    }
  }

  onCancel() {
    this.createPlaylistGroup.reset();
  }

  openDeleteDialog(playlist: Playlist) {
    const dialogRef = this.dialog.open(DeleteFromPlaylistModalComponent);
    const subscription = dialogRef.afterClosed().subscribe(result => {
      if (result.status === 'delete') {
        this.deletePlaylist(playlist);
        if (playlist.id === this.route.snapshot.queryParams['id']) {
          this.router.navigate(['/'])
        }
      }
    });

    this.subscriptions.push(subscription);
  }

  deletePlaylist(playlist: Playlist) {
    this.playlistsService.deletePlaylist(playlist.id);
  }

  createPlaylist(name: string) {
    this.playlistsService.createPlaylist(name);
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
