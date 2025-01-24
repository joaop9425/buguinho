import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserCountService {
  constructor(private http: HttpClient) {}
  // site_id = 38p7ig4owx
  // https://whos.amung.us/widget/your_site_id.json

  getActiveUsers() {
    return this.http.get("https://whos.amung.us/widget/38p7ig4owx.json", {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
}
