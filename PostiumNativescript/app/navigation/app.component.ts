import { Component } from "@angular/core";
import {Routes, Router} from '@angular/router';
import {PostListComponent} from "../post-list/post-list.component";
import {AuthorPostListComponent} from "../user-posts/user-posts.component";
import {CategoryPostListComponent} from "../category-posts/category-posts.component";
import {NewStoryComponent} from "../new-story/new-story.component";
import {LogOutComponent} from "../logout/logout.component";
import {LoginComponent} from "../login/login.component";
import {PostDetailComponent} from "../post-detail/post-detail.component";
import { SideDrawerLocation } from 'nativescript-telerik-ui-pro/sidedrawer';
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import {RouterExtensions} from "nativescript-angular";
import  * as appSettings from "application-settings";

@Component({
  selector: "tk-app",
  template: `<RadSideDrawer [drawerLocation]="_currentPosition" tkExampleTitle tkToggleNavButton>
    <!-- << angular-sidedrawer-location -->
    <StackLayout tkDrawerContent class="sideStackLayout">
        <ScrollView>
            <StackLayout class="sideStackLayout">
                <Label (tap)="goToHome()" text="Home" class="sideLabel"></Label>
                <Label *ngIf="!logged" (tap)="goToLogIn()" text="Log In" class="sideLabel"></Label>
                <Label *ngIf="logged" (tap)="goToNewStory()" text="Escribe una historia" class="sideLabel"></Label>
                <Label *ngIf="logged" (tap)="goToLogOut()" text="Log Out" class="sideLabel"></Label>
            </StackLayout>
        </ScrollView>
    </StackLayout>
    <StackLayout tkMainContent class="mainContent">
        <router-outlet></router-outlet>
    </StackLayout>
    </RadSideDrawer>`,
  styleUrls: ['navigation/app.component.css']
})
export class AppComponent {
  private _currentPosition = SideDrawerLocation.Left;
  public logged = false;

  constructor(private _router: Router){

  }

  ngOnInit(){
    var token = appSettings.getString("token", null);
    if (token !== null){
      this.logged = true;
    }
  }

  goToHome(){
    this._router.navigate(['/posts']);
  }
  goToLogIn(){
    this._router.navigate(['/login']);
  }
  goToLogOut(){
    this._router.navigate(['/logout']);
  }
  goToNewStory(){
    this._router.navigate(['/new-story']);
  }

}

export function createRouteEntryArray() {
  APP_ROUTES.push({ path: "", redirectTo: "/posts", pathMatch: 'full', data: { title: "Postium"} });
  APP_ROUTES.push({ path: "posts", component: PostListComponent, data: { title: "Postium"}  });
  APP_ROUTES.push({ path: "posts/:username", component: AuthorPostListComponent, data: { title: "Postium"}  });
  APP_ROUTES.push({ path: "posts/categories/:category", component: CategoryPostListComponent, data: { title: "Postium"}  });
  APP_ROUTES.push({ path: "new-story", component: NewStoryComponent, data: { title: "Crear Post"}  });
  APP_ROUTES.push({ path: "posts/:username/:postId", component: PostDetailComponent, data: { title: "Postium"}  });
  APP_ROUTES.push({ path: "logout", component: LogOutComponent, data: { title: "Log Out"}  });
  APP_ROUTES.push({ path: "login", component: LoginComponent, data: { title: "Log In"}  });
}

export const APP_ROUTES: Routes = [];