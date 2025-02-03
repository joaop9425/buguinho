import { NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-media",
  standalone: true,
  imports: [NgIf],
  templateUrl: "./media.component.html",
  styleUrl: "./media.component.scss",
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
