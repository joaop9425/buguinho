import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { TitleService } from './core/services/title.service';
import { GoogleAnalyticsService } from './core/services/google-analytics.service';
import { CookieBannerComponent } from "./core/components/cookie-banner/cookie-banner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CookieBannerComponent,
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  titlePage = 'Buguinho';
  constructor(
    private title: TitleService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private gaService: GoogleAnalyticsService,
  ) {
    this.title.set(this.titlePage);
    this.startMatrixEffect();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.gaService.event('page_view', { page_path: event.urlAfterRedirects });
      }
    });
  }

  startMatrixEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = canvas.width / 20;
    const drops: number[] = Array.from({ length: columns }, () => 1);

    function draw() {
      if (ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = '20px monospace';

        drops.forEach((y: any, index) => {
          const text = Math.random() > 0.5 ? '0' : '1';
          const x = index * 20;
          ctx.fillText(text, x, y * 20);

          if (y * 20 > canvas.height && Math.random() > 0.975) {
            drops[index] = 0;
          }
          drops[index]++;
        });
      }
    }

    setInterval(draw, 50);
  }
}
