import { NgFor, NgIf } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MemesService } from "../../core/services/memes.service";
import { TitleService } from "../../core/services/title.service";
import { MediaComponent } from "./media.component";
import { Meme, Memes } from "./memes.model";

@Component({
  selector: "app-posts",
  standalone: true,
  imports: [NgFor, NgIf, MediaComponent],
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
    private memesService: MemesService
  ) {}

  ngOnInit() {
    this.memesService.getMemes().subscribe((res: any) => {
      this.memes = res;
      this.totalPages = Math.ceil(this.memes.length / this.memesPerPage);
      this.route.queryParams.subscribe((params) => {
        const page = +params["page"] || 1;
        this.currentPage = page > 0 && page <= this.totalPages ? page : 1;
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    console.log(Number(this.memes.indexOf(meme) + 1));
    this.router.navigate(["/meme/" + Number(this.memes.indexOf(meme) + 1)], {
      state: { meme },
    });
  }
}
