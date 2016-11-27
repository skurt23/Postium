/**
 * Created by skurt on 26/11/16.
 */
import { Component, OnInit } from '@angular/core';
import listViewModule = require("nativescript-telerik-ui-pro/listview");
import {PostService} from "../shared/services/post.service";
import {RouterExtensions} from "nativescript-angular";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    moduleId: module.id,
    selector: 'user-posts',
    templateUrl: 'user-posts.component.html',
    styleUrls: ['user-posts.component.css'],
})
export class AuthorPostListComponent implements OnInit {
    private posts: any;
    private _sub: Subscription;
    private _paramsSub: Subscription;
    private _title: any;
    private _layout: listViewModule.ListViewLinearLayout;
    private _serviceSub: Subscription;
    private _username: string;
    private _search: string;
    private searchArray: any;

    constructor(private _route: ActivatedRoute, private _router: RouterExtensions, private _postService: PostService) {}

    ngOnInit() {
        this._sub = this._route.data.subscribe(data => {
            this._title = data['title'];
        });
        this._paramsSub = this._route.params.subscribe(params=>{
            this._username = params['username'];
        });
        this._serviceSub = this._postService.getUserPosts(this._username).subscribe(posts=>{
            this.posts = posts;
            this.searchArray = posts;
        });
    }

    ngOnDestroy(){
        this._sub.unsubscribe();
        this._serviceSub.unsubscribe();
        this._paramsSub.unsubscribe();
    }

    goToHome(){
        this._router.navigate(["/posts"])
    }

    goToDetail(post:any){
        this._router.navigate(["/posts/" + post.author.username + '/' + post.id]);
    }

    searchPost(){
        this.posts=[];
        var searchValue = this._search.toLowerCase();
        if (searchValue !== ''){
            for (var i = 0; i < this.searchArray.length; i++) {
                if (this.searchArray[i].title.toLowerCase().indexOf(searchValue) !== -1) {
                    this.posts.push(this.searchArray[i]);
                }

            }
        }else{
            this.posts = this.searchArray;
        }
    }
}