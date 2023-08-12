import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Playlist } from '../models/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  private playlists = new BehaviorSubject<Playlist[]>([]);
  public playlists$ = this.playlists.asObservable();

  constructor(
  ) {
    this.loadPlaylistFromLocalStorage();
  }

  createPlaylist(name: string) {
    const playlistId = this.generateId();
    let playlists = this.getPlaylists();
    playlists.push({ id: playlistId, title: name, thumbnail: '', videos: [] });
    this.updatePlaylists(playlists);
  }

  deletePlaylist(id: string) {
    const playlists = this.getPlaylists().filter(pls => pls.id !== id);
    this.updatePlaylists(playlists);
  }

  addVideo(playlistIds: string[], videoId: string, thumbnail?: string) {
    const playlists = this.getPlaylists().map((pls: Playlist) => {
      if (playlistIds.includes(pls.id)) {
        pls.videos.push(videoId);
        if (!pls.thumbnail) {
          pls.thumbnail = thumbnail;
        }
      };
      return pls;
    });
    this.updatePlaylists(playlists);
  }

  removeVideo(plalistId: string, videoId: string, thumbnail?: string) {
    const playlists = this.getPlaylists().map(pls => {
      if (pls.id === plalistId) {
        pls.videos = pls.videos.filter(id => id !== videoId);
        pls.thumbnail = thumbnail;
      }
      return pls;
    })
    this.updatePlaylists(playlists);
  }

  updatePlaylists(newPlaylists: Playlist[]) {
    this.playlists.next(newPlaylists);
    localStorage.setItem('playlists', JSON.stringify(this.playlists.getValue()));
  }

  getPlaylists() {
    return this.playlists.getValue();
  }

  private loadPlaylistFromLocalStorage() {
    const storedPlaylist = localStorage.getItem('playlists');
    if (storedPlaylist) {
      this.playlists.next(JSON.parse(storedPlaylist));
    }
  }

  private generateId() {
    const ids = this.playlists.getValue().map((playlist: Playlist) => Number(playlist.id));
    return ids.length > 0 ? (Math.max(...ids) + 1).toString() : '1';
  }
}
