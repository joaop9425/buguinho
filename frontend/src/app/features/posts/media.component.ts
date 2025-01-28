import { NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-media",
  template: `
    <div class="media-container">
      <img
        *ngIf="isImage(mediaUrl) || forceType === 'image'"
        [src]="mediaUrl"
        alt="Media Image"
      />
      <video
        *ngIf="isVideo(mediaUrl) || forceType === 'video'"
        [src]="mediaUrl"
        controls
        preload="metadata"
      ></video>
      <img
        *ngIf="isGif(mediaUrl) || forceType === 'gif'"
        [src]="mediaUrl"
        alt="Media Gif"
      />
    </div>
  `,
  // styleUrls: ["./media.component.scss"],
  standalone: true,
  imports: [NgIf],
})
export class MediaComponent {
  @Input() mediaUrl: string = "";
  @Input() forceType: "image" | "video" | "gif" | null = null;

  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  }

  isVideo(url: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(url);
  }

  isGif(url: string): boolean {
    return /\.gif$/i.test(url);
  }
}
