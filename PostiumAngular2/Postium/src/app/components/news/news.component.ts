import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Post } from "../../models/post";
import {SessionStorage, SessionStorageService} from "ng2-webstorage";

@Component({
    templateUrl: "./news.component.html"
})
export class NewsComponent implements OnInit {

    posts: Post[];
    searchPost: string;
    @SessionStorage('username') username;

    constructor(private _activatedRoute: ActivatedRoute, private _sessionStorage: SessionStorageService) { }

    ngOnInit(): void {
        this._activatedRoute.data.forEach((data: { posts: Post[] }) => this.posts = data.posts);
        window.scrollTo(0, 0);
        this._activatedRoute.queryParams.subscribe((params) => this.searchPost = params['search']);

        for (var i in this.posts){
            if (this.posts[i].author.username === this.username){
                this._sessionStorage.store('user_id', this.posts[i].author.id);
            }
        }
    }
}
