/**
 * Created by skurt on 18/11/16.
 */

import {Component, OnDestroy} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
@Component({
    selector: 'logout',
    templateUrl: './app/components/login/login.component.html',
    styleUrls: ['./app/components/login/login.component.css'],
})
export class LogInComponent implements OnDestroy{

    private _userSubscription: Subscription;

    constructor(private _userService: UserService, private _router: Router){

    }

    ngOnDestroy(){
        if (typeof this._userSubscription !== 'undefined'){
            this._userSubscription.unsubscribe();
        }

    }

    login(form: FormGroup){
        this._userSubscription = this._userService.login(form.value.username, form.value.password).subscribe(()=>this._router.navigate(['/']));

    }
}