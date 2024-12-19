import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { PostComponent } from "./features/post/post.component";
import { PostsComponent } from "./features/posts/posts.component";
import { AboutComponent } from "./features/about/about.component";

export const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    children: [
      {
        path: "",
        component: PostsComponent,
      },
      {
        path: "meme/:id",
        component: PostComponent,
      },
      // {
      //   path: "sobre",
      //   component: AboutComponent,
      // }
    ],
  },
  {
    path: "sobre",
    component: AboutComponent
  }
];
