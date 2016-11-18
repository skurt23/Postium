/**
 * Created by skurt on 18/11/16.
 */
import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {PostService} from "../../services/post.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Post} from "../../models/post";
@Component({
    selector: 'edit-post',
    templateUrl: './app/components/edit-post/edit-post.component.html',
    styleUrls: ['./app/components/edit-post/edit-post.component.css'],
})

export class EditPostComponent implements OnInit{

    private _postSubscription: Subscription;
    post: Post;

    constructor(
        private _postService: PostService,
        private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void{
        this._activatedRoute.data.forEach((data: { post: Post}) => this.post = data.post);
        window.scrollTo(0, 0);
    }

    ngOnDestroy(): void {
        this._unsubscribePostCreation();
    }

    updatePost(post: Post): void {
        this._unsubscribePostCreation();
        this._postSubscription = this._postService.updatePost(post).subscribe((response) => console.log(response));
    }

    private _unsubscribePostCreation(): void {
        if (this._postSubscription) {
            this._postSubscription.unsubscribe();
        }
    }
}