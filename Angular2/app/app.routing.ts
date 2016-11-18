import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CategoryPostsComponent } from "./components/category-posts/category-posts.component";
import { NewsComponent } from "./components/news/news.component";
import { NewStoryComponent } from "./components/new-story/new-story.component";
import { PostDetailsComponent } from "./components/post-details/post-details.component";
import { UserPostsComponent } from "./components/user-posts/user-posts.component";
import { PostDetailsResolve } from "./services/post-details-resolve.service";
import { PostsResolve } from "./services/posts-resolve.service";
import {LogOutComponent} from "./components/logout/logout.component";
import {EditPostComponent} from "./components/edit-post/edit-post.component";
import {LogInComponent} from "./components/login/login.component";

const routes: Routes = [
    {
        path: "posts",
        component: NewsComponent,
        resolve: {
            posts: PostsResolve
        }
    },
    {
        path: "posts/:username",
        component: UserPostsComponent,
        resolve: {
            posts: PostsResolve
        }
    },
    {
        path: "posts/categories/:category",
        component: CategoryPostsComponent,
        resolve: {
            posts: PostsResolve
        }
    },
    {
        path: "new-story",
        component: NewStoryComponent
    },
    {
        path: "posts/:username/:postId",
        component: PostDetailsComponent,
        resolve: {
            post: PostDetailsResolve
        }
    },
    {
        path: 'logout',
        component: LogOutComponent,
    },
    {
        path: 'login',
        component: LogInComponent,
    },
    {
        path:'edit-post/:username/:postId',
        component: EditPostComponent,
        resolve: {
            post: PostDetailsResolve
        }
    },
    {
        path: "**",
        redirectTo: "/posts"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
