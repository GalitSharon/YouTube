export interface VideoDataResponse {
    items: VideoItem[];
}

export interface VideoItem {
    etag: string;
    id: {
        videoId: string
    };
    snippet: {
        channelId: string;
        channelTitle: string;
        publishTime: Date;
        publishedAt: Date;
        title: string;
        description: string;
        thumbnails: {
            default: ThumbnailItem;
            high: ThumbnailItem;
            medium: ThumbnailItem;
        }
    };
    statistics?: {
        viewCount: string;
    }
}

export interface ThumbnailItem {
    height: number;
    width: number;
    url: string;
}

