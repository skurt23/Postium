/**
 * Created by skurt on 18/11/16.
 */
import { Inject, Injectable } from "@angular/core";
import {Jsonp, Http, Response, Headers, URLSearchParams} from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import {SessionStorageService} from "ng2-webstorage";


@Injectable()
export class UserService{

    constructor(private _http: Http, private _sessionStorage: SessionStorageService){}

    login(username:string, password:string): Observable<any>{

        let object = {
            username: username,
            password: password,
        };

        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this._http.post(`http://localhost:8000/rest-auth/login/`, JSON.stringify(object), {headers: headers})
            .map((response:Response) => {
                var token = response.json().key;
                this._sessionStorage.store('auth_token', token);
                this._sessionStorage.store('username', username);
            });
    }

    logout(token: string): Observable<any>{
        let tokenJson = {
            key: token
        };
        return this._http.post(`http://localhost:8000/rest-auth/logout/`, JSON.stringify(tokenJson))
            .map((response:Response) => {
                this._sessionStorage.clear('auth_token');
                this._sessionStorage.clear('username');
            });
    }
}