import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { TitleService } from '../../core/services/title.service';
import { Meme } from '../posts/model/memes.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {

  public meme!: Meme;

  constructor(
    public router: Router,
    private titleService: TitleService,
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const { meme } = this.router.lastSuccessfulNavigation?.extras.state || {};
    this.meme = meme;
    if (navigation?.extras.state) {
      this.meme = navigation.extras.state['meme'];
      this.titleService.set(`Buguinho | Meme ${this.meme.title}`);
    }
  }
}
