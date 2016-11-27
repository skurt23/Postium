import { NativeScriptModule, platformNativeScriptDynamic } from "nativescript-angular/platform";
import * as elementRegistryModule from 'nativescript-angular/element-registry';
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui-pro/listview/angular';
import { CALENDAR_DIRECTIVES } from 'nativescript-telerik-ui-pro/calendar/angular';
import { CHART_DIRECTIVES } from 'nativescript-telerik-ui-pro/chart/angular';
import { DATAFORM_DIRECTIVES } from 'nativescript-telerik-ui-pro/dataform/angular';
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";
import { AppComponent, createRouteEntryArray, APP_ROUTES } from "./navigation/app.component";
import { AppComponents } from "./navigation/appComponents";
import { COMMON_DIRECTIVES } from './navigation/directives';
import * as applicationModule from "application";
import * as frescoModule from "nativescript-fresco";
import { NSFRESCO_DIRECTIVES } from "nativescript-fresco/angular";
import { BackendUriProvider } from './shared/services/settings.service';
import { UserService } from './shared/services/user.service';
import { CategoryService } from './shared/services/category.service';
import { PostService } from './shared/services/post.service';
import { FromNowPipe } from './shared/pipes/from-now.pipe';
import { SearchPipe } from './shared/pipes/search.pipe';
import {NativeScriptHttpModule} from "nativescript-angular";
import { TNSFontIconModule } from 'nativescript-ng2-fonticon';

if (applicationModule.android) {
    applicationModule.on("launch", () => {
        frescoModule.initialize();
    });
}
createRouteEntryArray();

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        LISTVIEW_DIRECTIVES,
        SIDEDRAWER_DIRECTIVES,
        CALENDAR_DIRECTIVES,
        CHART_DIRECTIVES,
        DATAFORM_DIRECTIVES,
        COMMON_DIRECTIVES,
        NSFRESCO_DIRECTIVES,
        AppComponent,
        AppComponents,
        FromNowPipe,
        SearchPipe
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(APP_ROUTES),
        TNSFontIconModule.forRoot({
            'fa': 'font-awesome.css'
        })
    ],
    exports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptHttpModule
    ],
    providers: [
        BackendUriProvider,
        UserService,
        CategoryService,
        PostService
    ]
})
class AppModule { 

}

platformNativeScriptDynamic().bootstrapModule(AppModule);