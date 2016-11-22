/**
 * Created by skurt on 18/11/16.
 */
import {Component, OnDestroy} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
@Component({
    selector: 'logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css'],
})
export class LogOutComponent implements OnDestroy{

    private _userSubscription: Subscription;

    constructor(private _userService: UserService, private _router: Router){

    }

    ngOnDestroy(){
        this._userSubscription.unsubscribe()
    }

    logout(){
        var token = sessionStorage.getItem('auth_token');
        this._userSubscription = this._userService.logout(token).subscribe();
        this._router.navigate(['/posts/']);
    }
}
