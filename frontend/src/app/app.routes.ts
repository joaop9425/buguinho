import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { LeftSidebarComponent } from "./core/components/sidebar/sidebar.component";
import { AboutComponent } from "./features/about/about.component";
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
        data: {
          title: "nuvem",
          text: "a melhor explicação",
          mediaUrl:
            "https://i.pinimg.com/736x/1a/fa/19/1afa196e89e0d1adfa0b7620f0ff969b.jpg",
          userPhoto:
            "https://avatars.githubusercontent.com/u/28512659?s=400&u=05920c6ba695a42ab05a41f4a243d397770b9770&v=4",
          username: "Jota",
        },
      },
    ],
  },
  { path: "", component: LeftSidebarComponent, outlet: "secondary" },
  {
    path: "sobre",
    component: AboutComponent,
  },
];
