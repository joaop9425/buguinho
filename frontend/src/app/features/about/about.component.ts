import { Component } from "@angular/core";
import { TitleService } from "../../core/services/title.service";
import { HttpClient } from "@angular/common/http";
import { marked } from "marked";

@Component({
  selector: "app-about",
  standalone: true,
  imports: [],
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.scss",
})
export class AboutComponent {
  readmeHtml: string = "";

  constructor(
    private title: TitleService,
    private http: HttpClient,
  ) {
    this.title.set("Buguinho | Sobre");
  }

  ngOnInit() {
    this.http
      .get("assets/README.md", { responseType: "text" })
      .subscribe(async (md) => {
        this.readmeHtml = await marked(md); // Converte Markdown em HTML
      });
  }
}