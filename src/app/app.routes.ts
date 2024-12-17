import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PostsComponent } from './features/posts/posts.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: PostsComponent
      }
    ]
  },
];
