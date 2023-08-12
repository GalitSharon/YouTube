import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { Video } from '../models/video';
import { VideoDataResponse, VideoItem } from '../models/video-data-response';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private BASE_URL = 'https://www.googleapis.com/youtube/v3';
  private API_KEY = environment.YOUTUBE_API_KEY;

  constructor(private http: HttpClient) {
  }

  searchVideos(keyword: any, order: any): Observable<Video[]> {
    const params = new HttpParams({
      fromObject: {
        q: keyword,
        part: 'snippet',
        type: 'video',
        maxResults: '30',
        key: this.API_KEY,
        order: order
      }
    });

    return this.http.get<VideoDataResponse>(this.BASE_URL + '/search', { params })
      .pipe(
        map((res: VideoDataResponse) => {
          const videos = res['items'];
          return videos.map((video: VideoItem) => (
            {
              id: video.id.videoId,
              title: video.snippet.title,
              thumbnails: video.snippet.thumbnails,
              publishDate: video.snippet.publishTime,
              description: video.snippet.description,
              viewCount: video?.statistics?.viewCount
            }
          ));
        })
      );
  }

  getVideos(ids: string[]): Observable<Video[]> {
    const formattedIds = ids.join(',');
    const params = new HttpParams({
      fromObject: {
        part: 'snippet,contentDetails,statistics',
        key: this.API_KEY,
        id: formattedIds
      }
    });

    return this.http.get<VideoDataResponse>(this.BASE_URL + '/videos', { params })
      .pipe(
        map((res: VideoDataResponse) => {
          const videos = res['items'];
          return videos.map((video: any) => (
            {
              id: video.id,
              title: video.snippet.title,
              thumbnails: video.snippet.thumbnails,
              publishDate: video.snippet.publishedAt,
              description: video.snippet.description,
              viewCount: video.statistics.viewCount
            }
          ));
        })
      );
  }
}
