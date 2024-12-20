import { Component } from '@angular/core';
import { TitleService } from '../../core/services/title.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  constructor(private title: TitleService) {
    this.title.set('Buguinho | Sobre');
  }

}
