import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MemesService {
  constructor(private http: HttpClient) {}

  getMemes() {
    return this.http.get("assets/json/memes.json");
  }
}
