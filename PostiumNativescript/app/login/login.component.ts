/**
 * Created by skurt on 26/11/16.
 */
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import * as appSettings from "application-settings";
import {UserService} from "../shared/services/user.service";
import {RouterExtensions} from "nativescript-angular";
import {Subscription} from "rxjs";

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    private _sub: Subscription;
    private _title: any;
    private username:string;
    private password: string;
    private _userSub:Subscription;
    constructor(private _route: ActivatedRoute, private _router: RouterExtensions, private _userService: UserService) { }

    ngOnInit() {
        this._sub = this._route.data.subscribe(data => {
            this._title = data['title'];
        });
    }

    ngOnDestroy(){
        this._sub.unsubscribe();
        if (typeof this._userSub !== 'undefined'){
            this._userSub.unsubscribe()
        }
    }

    login(){
        this._userSub = this._userService.login(this.username, this.password).subscribe(()=>this._router.navigate(['/posts']));
    }

}