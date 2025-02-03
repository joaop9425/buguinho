import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CookieConsentService {
  private readonly consentKey = "cookie_consent";

  constructor() {}

  hasConsent(): boolean {
    return localStorage.getItem(this.consentKey) === "true";
  }

  setConsent(consent: boolean) {
    localStorage.setItem(this.consentKey, consent.toString());
  }
}
