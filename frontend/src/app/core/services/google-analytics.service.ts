import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GoogleAnalyticsService {
  constructor() {}

  public event(eventName: string, params?: any) {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, params);
    }
  }
}
