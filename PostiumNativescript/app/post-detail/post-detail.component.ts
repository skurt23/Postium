/**
 * Created by skurt on 26/11/16.
 */
import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import {PostService} from "../shared/services/post.service";
import {Post} from "../shared/models/post";

@Component({
    moduleId: module.id,
    selector: 'post-detail',
    templateUrl: 'post-detail.component.html',
    styleUrls: ['post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
    private post: any;
    private _sub: Subscription;
    private _paramsSub: Subscription;
    private _title: any;
    private _serviceSub: Subscription;
    private _username: string;
    private _id: number;
    private title: string;
    private avatar: string;
    private media: string;
    private firstName: string;
    private lastName: string;
    private intro: string;
    private body: string;
    private publicationDate: string;
    private categories: any;


    constructor(private _route: ActivatedRoute, private _router: RouterExtensions, private _postService: PostService) {}

    ngOnInit() {
        this._sub = this._route.data.subscribe(data => {
            this._title = data['title'];
        });
        this._paramsSub = this._route.params.subscribe(params=>{
            this._username = params['username'];
            this._id = params['postId'];
        });
        this._serviceSub = this._postService.getPostDetails(this._username, this._id).subscribe(post=>{
            this.post = post;
            this.title = this.post.title;
            this.media = this.post.media;
            this.body = this.post.body;
            this.intro = this.post.intro;
            this.categories = this.post.categories;
            this.avatar = this.post.author.avatar;
            this.firstName = this.post.author.firstName;
            this.lastName = this.post.author.lastName;
            this.publicationDate = this.post.publicationDate;
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

    showAuthorPosts(post:any){
        this._router.navigate(["/posts/" + post.author.username])
    }

    categoryClicked(category:any){
        var categoryName = category.name;
        if (categoryName == 'Esto es serio'){
            categoryName = 'EstoEsSerio';
        }else if (categoryName == 'Poor Thing'){
            categoryName = 'PoorThing';
        }
        this._router.navigate(['/posts/categories/', categoryName]);
    }

}