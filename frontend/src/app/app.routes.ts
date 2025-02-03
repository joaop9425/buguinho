import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { LeftSidebarComponent } from "./core/components/sidebar/sidebar.component";
// import { AboutComponent } from "./features/about/about.component";
import { PostComponent } from "./features/post/post.component";
import { PostsComponent } from "./features/posts/posts.component";

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
    ],
  },
  { path: "", component: LeftSidebarComponent, outlet: "secondary" },
  // {
  //   path: "sobre",
  //   component: AboutComponent,
  // },
];
