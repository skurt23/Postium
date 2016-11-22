import {Component, OnInit} from "@angular/core";
import {Router, NavigationExtras} from "@angular/router";
import {SessionStorageService, SessionStorage} from "ng2-webstorage";
import {Subscription} from "rxjs";

@Component({
    selector: "header-bar",
    templateUrl: "./header-bar.component.html",
    styleUrls: ["./header-bar.component.css"]
})
export class HeaderBarComponent implements OnInit{

    @SessionStorage('auth_token') authToken;
    logged: boolean = false;
    userAuth: Subscription;

    constructor(private _router: Router, private _sessionStorage: SessionStorageService){}

    ngOnInit(){
        if (this.authToken !== null){
            this.logged = true;
        }else{
            this.logged = false;
        }

        this.userAuth = this._sessionStorage.observe('auth_token')
            .subscribe((value) => {
                if (value !== null){
                    this.logged = true;
                }else{
                    this.logged = false;
                }
            })
    }

    ngOnDestroy(){
        this.userAuth.unsubscribe();
    }
    searchPost(searchText: string){
        let  navigationExtras: NavigationExtras = {
            queryParams: {'search': searchText}
        };
        this._router.navigate(['/posts/'], navigationExtras);
    }
}

