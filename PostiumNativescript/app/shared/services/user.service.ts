/**
 * Created by skurt on 18/11/16.
 */
import { Inject, Injectable } from "@angular/core";
import {Jsonp, Http, Response, Headers, URLSearchParams} from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import * as appSettings from "application-settings";
import {AppComponent} from "../../navigation/app.component";

@Injectable()
export class UserService{

    constructor(private _http: Http){}

    login(username:string, password:string): Observable<any>{

        let object = {
            username: username,
            password: password,
        };

        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this._http.post(`http://localhost:8000/rest-auth/login/`, JSON.stringify(object), {headers: headers})
            .map((response:Response) => {
                var token = response.json().key;
                appSettings.setString("token", token);
                AppComponent.arguments.logged = true;
            });
    }

    logout(token: string): Observable<any>{
        let tokenJson = {
            key: token
        };
        return this._http.post(`http://localhost:8000/rest-auth/logout/`, JSON.stringify(tokenJson))
            .map((response:Response) => {
                appSettings.remove("token");
                AppComponent.arguments.logged = false;
            });
    }
}