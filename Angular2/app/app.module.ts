import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import { NgModule } from "@angular/core";
import { FromNowPipe } from './pipes/from-now.pipe';
import { SearchPipe } from './pipes/search.pipe';

/*----------------------------------------------------------|
 | ~~~ Blue Path ~~~                                        |
 |----------------------------------------------------------|
 | Importa FromNowPipe para poder usarlo en este documento. |
 |----------------------------------------------------------*/

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { AutoGrowDirective } from "./directives/auto-grow.directive";
import { BackendUriProvider} from "./services/settings.service";
import { CategoryBoxComponent } from "./components/category-box/category-box.component";
import { CategoryPostsComponent } from "./components/category-posts/category-posts.component";
import { CategoryService } from "./services/category.service";
import { HeaderBarComponent } from "./components/header-bar/header-bar.component";
import { NewsComponent } from "./components/news/news.component";
import { NewStoryComponent } from "./components/new-story/new-story.component";
import { PostDetailsComponent } from "./components/post-details/post-details.component";
import { PostDetailsResolve } from "./services/post-details-resolve.service";
import { PostFormComponent } from "./components/post-form/post-form.component";
import { PostPreviewComponent } from "./components/post-preview/post-preview.component";
import { PostsListComponent } from "./components/posts-list/posts-list.component";
import { PostsResolve } from "./services/posts-resolve.service";
import { PostService } from "./services/post.service";
import { SearchBoxComponent } from "./components/search-box/search-box.component";
import { UserPostsComponent } from "./components/user-posts/user-posts.component";
import {CommonModule} from "@angular/common";
import {LogOutComponent} from "./components/logout/logout.component";
import {EditPostComponent} from "./components/edit-post/edit-post.component";
import {LogInComponent} from "./components/login/login.component";
import {UserService} from "./services/user.service";
import {Ng2Webstorage} from "ng2-webstorage";

@NgModule({
    imports: [
        AppRoutingModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        Ng2Webstorage,
    ],

    /*-----------------------------------------------|
     | ~~~ Blue Path ~~~                             |
     |-----------------------------------------------|
     | No olvides declarar FromNowPipe en el módulo. |
     |-----------------------------------------------*/

    declarations: [
        AppComponent,
        AutoGrowDirective,
        CategoryBoxComponent,
        CategoryPostsComponent,
        EditPostComponent,
        HeaderBarComponent,
        LogInComponent,
        LogOutComponent,
        NewsComponent,
        NewStoryComponent,
        PostDetailsComponent,
        PostPreviewComponent,
        PostFormComponent,
        PostsListComponent,
        SearchBoxComponent,
        UserPostsComponent,
        FromNowPipe,
        SearchPipe,
    ],
    providers: [
        BackendUriProvider,
        CategoryService,
        PostDetailsResolve,
        PostService,
        PostsResolve,
        UserService,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
