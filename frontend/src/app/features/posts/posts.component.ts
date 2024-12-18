import { NgFor } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [NgFor],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  memes = [
    { text: 'Meme 01', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 02', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 03', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 04', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 05', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 06', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 07', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 08', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 09', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 10', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 11', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 12', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 13', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 14', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 15', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 16', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 17', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 18', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 19', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 20', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 21', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 22', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 23', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 24', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 25', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 26', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 27', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 28', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 29', imageUrl: 'https://via.placeholder.com/300x200' },
    { text: 'Meme 30', imageUrl: 'https://via.placeholder.com/300x200' },
  ];

  memesPerPage = 10;
  currentPage = 1;
  totalPages = 0;
  currentPageMemes: { text: string; imageUrl: string }[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.totalPages = Math.ceil(this.memes.length / this.memesPerPage);
    this.route.queryParams.subscribe((params) => {
      const page = +params['page'] || 1; // Padrão para página 1
      this.currentPage = page > 0 && page <= this.totalPages ? page : 1;
      this.updateCurrentPageMemes();
    });
  }

  updateCurrentPageMemes() {
    const startIndex = (this.currentPage - 1) * this.memesPerPage;
    const endIndex = startIndex + this.memesPerPage;
    this.currentPageMemes = this.memes.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateUrl();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateUrl();
    }
  }

  updateUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge', // Preserva outros parâmetros existentes
    });
    this.updateCurrentPageMemes();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.nextPage();
    } else if (event.key === 'ArrowLeft') {
      this.previousPage();
    }
  }
}
