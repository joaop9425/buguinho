import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TitleService } from '../../core/services/title.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  memeId: number;

  constructor(
    public router: Router,
    private titleService: TitleService,
  ) {
    this.memeId = Number(router.url.replace('/meme/', ''));
    this.titleService.set(`Buguinho | Meme ${this.memeId}`);
  }

}
