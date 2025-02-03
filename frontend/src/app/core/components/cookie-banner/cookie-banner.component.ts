import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CookieConsentService } from '../../services/cookie-consent.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [NgIf],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss'
})
export class CookieBannerComponent {
  showBanner: boolean;

  constructor(private cookieConsentService: CookieConsentService) {
    this.showBanner = !this.cookieConsentService.hasConsent();
  }

  acceptCookies() {
    this.cookieConsentService.setConsent(true);
    this.showBanner = false;
    this.loadAnalytics();
  }

  rejectCookies() {
    this.cookieConsentService.setConsent(false);
    this.showBanner = false;
  }

  private loadAnalytics() {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-H0220F6LER";
      document.head.appendChild(script);

      script.onload = () => {
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any) { (window as any).dataLayer.push(args); }
        gtag('js', new Date());
        gtag('config', 'G-H0220F6LER');
      };
    }
  }
}
