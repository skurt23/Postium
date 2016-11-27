/**
 * Created by skurt on 26/11/16.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import * as appSettings from "application-settings";
import {Subscription} from "rxjs";
import {UserService} from "../shared/services/user.service";
import {RouterExtensions} from "nativescript-angular";

@Component({
    moduleId: module.id,
    selector: 'logout',
    templateUrl: 'logout.component.html',
    styleUrls: ['logout.component.css']
})
export class LogOutComponent implements OnInit {

    private _sub: Subscription;
    private _title: any;
    private token = appSettings.getString("token", null);
    private _userSub: Subscription;
    constructor(private _route: ActivatedRoute,private _router: RouterExtensions, private _userService: UserService) { }

    ngOnInit() {
        this._sub = this._route.data.subscribe(data => {
            this._title = data['title'];
        });
    }

    ngOnDestroy(){
        this._sub.unsubscribe();
        this._userSub.unsubscribe();
    }

    logout(){
        if (this.token !== null){
            this._userSub = this._userService.logout(this.token).subscribe(()=>this._router.navigate(['/posts']));
        }
    }
}