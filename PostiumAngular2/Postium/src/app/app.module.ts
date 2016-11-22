import {BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG} from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import { NgModule } from "@angular/core";
import {AppRoutingModule} from "./app.routing";
import {CommonModule} from "@angular/common";
import {Ng2Webstorage} from "ng2-webstorage";
import {ResponsiveModule} from "ng2-responsive";
import {AppComponent} from "./app.component";
import {AutoGrowDirective} from "./directives/auto-grow.directive";
import {CategoryBoxComponent} from "./components/category-box/category-box.component";
import {CategoryPostsComponent} from "./components/category-posts/category-posts.component";
import {EditPostComponent} from "./components/edit-post/edit-post.component";
import {HeaderBarComponent} from "./components/header-bar/header-bar.component";
import {LikeComponent} from "./components/like/like.component";
import {LogInComponent} from "./components/login/login.component";
import {LogOutComponent} from "./components/logout/logout.component";
import {NewsComponent} from "./components/news/news.component";
import {NewStoryComponent} from "./components/new-story/new-story.component";
import {PostDetailsComponent} from "./components/post-details/post-details.component";
import {PostPreviewComponent} from "./components/post-preview/post-preview.component";
import {PostFormComponent} from "./components/post-form/post-form.component";
import {PostsListComponent} from "./components/posts-list/posts-list.component";
import {SearchBoxComponent} from "./components/search-box/search-box.component";
import {UserPostsComponent} from "./components/user-posts/user-posts.component";
import {BackendUriProvider} from "./services/settings.service";
import {CategoryService} from "./services/category.service";
import {PostDetailsResolve} from "./services/post-details-resolve.service";
import {PostService} from "./services/post.service";
import {PostsResolve} from "./services/posts-resolve.service";
import {UserService} from "./services/user.service";
import {SearchPipe} from "./pipes/search.pipe";
import {FromNowPipe} from "./pipes/from-now.pipe";

/*----------------------------------------------------------|
 | ~~~ Blue Path ~~~                                        |
 |----------------------------------------------------------|
 | Importa FromNowPipe para poder usarlo en este documento. |
 |----------------------------------------------------------*/



export class MyHammerConfig extends HammerGestureConfig  {
    overrides = <any>{
        'swipe': {velocity: 0.4, threshold: 20},// override default settings
        'pinch': {enable:true}
    };
    events: string[] = ['pinch'];
}

@NgModule({
    imports: [
        AppRoutingModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        Ng2Webstorage,
        ResponsiveModule,
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
        LikeComponent,
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
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: MyHammerConfig
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
