import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Video } from 'src/app/core/models/video';

@Component({
  selector: 'app-video-display',
  templateUrl: './video-display.component.html',
  styleUrls: ['./video-display.component.scss']
})
export class VideoDisplayComponent implements OnInit, OnChanges {
  @Input() video!: Video;
  @Input() isPlaylistDisplay!: boolean;
  videoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadVideo(this.video);
  }

  ngOnChanges() {
    this.loadVideo(this.video);
  }

  loadVideo(video: Video) {
    //  sanitize URLs when dynamically inserting them into iframes for security reasons.
    if (video) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.id}`);
    }
  }
}
