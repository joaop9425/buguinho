import { NgFor, NgIf } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TitleService } from "../../core/services/title.service";
import { MemesService } from "../../core/services/memes.service";
import { Meme, Memes } from "./memes.model";

@Component({
  selector: "app-posts",
  standalone: true,
  imports: [
    NgFor,
    NgIf,
  ],
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
})
export class PostsComponent {
  memes: Memes = [];
  memesPerPage = 10;
  currentPage = 1;
  totalPages = 0;
  currentPageMemes: typeof this.memes = [];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private memesService: MemesService,
  ) { }

  ngOnInit() {
    this.memesService.getMemes().subscribe((res: any) => {
      this.memes = res;
      this.totalPages = Math.ceil(this.memes.length / this.memesPerPage);
      this.route.queryParams.subscribe((params) => {
        const page = +params["page"] || 1;
        this.currentPage =
          page > 0 && page <= this.totalPages ? page : 1;
        this.updateCurrentPageMemes();
      });
    });
  }

  updateCurrentPageMemes() {
    const startIndex = (this.currentPage - 1) * this.memesPerPage;
    const endIndex = startIndex + this.memesPerPage;
    this.currentPageMemes = this.memes.slice(startIndex, endIndex);
    this.setTitlePage();
  }

  setTitlePage() {
    this.titleService.set(`Buguinho | Página ${this.currentPage}`);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateUrl();
      this.scrollToTop();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateUrl();
      this.scrollToTop();
    }
  }

  updateUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage },
      queryParamsHandling: "merge",
    });
    this.updateCurrentPageMemes();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  }

  isVideo(url: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(url);
  }

  @HostListener("window:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      this.nextPage();
    } else if (event.key === "ArrowLeft") {
      this.previousPage();
    }
  }

  sendMemeToComponent(meme: Meme) {
    this.router.navigate(
      ['/meme/' + Number(this.memes.indexOf(meme) + 1)],
      { state: { meme } }
    );
  }
}
