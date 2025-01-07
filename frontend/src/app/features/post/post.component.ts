import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TitleService } from '../../core/services/title.service';
import { Meme } from '../posts/memes.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  @Input()
  public meme!: Meme;

  constructor(
    public router: Router,
    private titleService: TitleService,
  ) {
    this.titleService.set(`Buguinho | Meme ${this.meme['title']}`);
  }

}
