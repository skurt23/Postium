/**
 * Created by skurt on 26/11/16.
 */
import {Component, OnInit} from '@angular/core';
import listViewModule = require("nativescript-telerik-ui-pro/listview");
import {ActivatedRoute} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import {Subscription} from "rxjs";
import {PostService} from "../shared/services/post.service";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';

@Component({
    moduleId: module.id,
    selector: 'post-list',
    templateUrl: 'post-list.component.html',
    styleUrls: ['post-list.component.css'],
})
export class PostListComponent implements OnInit {

    private posts: any;
    private _sub: Subscription;
    private _title: any;
    private _layout: listViewModule.ListViewLinearLayout;
    private _serviceSub: Subscription;
    private _search: string;
    private searchArray: any;

    constructor(private _route: ActivatedRoute,
                private _router: RouterExtensions,
                private _postService: PostService,
                private _tnsFontIconService: TNSFontIconService) {}

    ngOnInit() {
        this._sub = this._route.data.subscribe(data => {
            this._title = data['title'];
        });
       this._serviceSub = this._postService.getPosts().subscribe(posts=>{
            this.posts = posts;
            this.searchArray = posts;
        });
    }

    ngOnDestroy(){
        this._sub.unsubscribe();
        this._serviceSub.unsubscribe();
    }

    showAuthorPosts(post:any){
        this._router.navigate(["/posts/" + post.author.username])
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