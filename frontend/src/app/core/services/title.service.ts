import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private title: Title) { }

  resetTitle() {
    this.title.setTitle("")
  }

  set(str: string) {
    this.title.setTitle(str);
  }

  get() {
    this.title.getTitle();
  }
}
