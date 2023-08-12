import { ThumbnailItem } from "./video-data-response";

export interface Video {
    id: string;
    title: string;
    publishDate: Date;
    description: string;
    thumbnails: {
        default: ThumbnailItem;
        high: ThumbnailItem;
        medium: ThumbnailItem;
    };
    viewCount?: string;
}