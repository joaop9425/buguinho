import { NgIf } from '@angular/common';
import { Component, HostListener, Renderer2, ElementRef } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  scrolled = false;
  clickBug1 = false;
  clickCountBug1 = 0;
  clickBug2 = false;
  clickCountBug2 = 0;

  constructor(public router: Router, private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.pageYOffset > 50; // Quando a página for rolada mais de 50px
  }

  drop() {
    this.clickCountBug1++;
    if (this.clickCountBug1 >= 5) {
      this.clickBug1 = !this.clickBug1;
      const bugElement = this.el.nativeElement.querySelector('.cai');
      if (this.clickBug1) {
        this.renderer.addClass(bugElement, 'falling');
      } else {
        this.renderer.removeClass(bugElement, 'falling');
      }
      setTimeout(() => {
        this.renderer.removeClass(bugElement, 'falling');
        this.clickCountBug1 = 0;
      }, 5000);
    }
  }

  up() {
    this.clickCountBug2++;
    if (this.clickCountBug2 >= 5) {
      this.clickBug2 = !this.clickBug2;
      const bugElement = this.el.nativeElement.querySelector('.voa');
      if (this.clickBug2) {
        this.renderer.addClass(bugElement, 'flying');
      } else {
        this.renderer.removeClass(bugElement, 'flying');
      }
      setTimeout(() => {
        this.renderer.removeClass(bugElement, 'flying');
        this.clickCountBug2 = 0;
      }, 5000);
    }
  }

  public scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
