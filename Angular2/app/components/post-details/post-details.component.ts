import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import { Post } from "../../models/post";
import {Category} from "../../models/category";
import {User} from "../../models/user";
import {SessionStorage, SessionStorageService} from "ng2-webstorage";
import {Subscription} from "rxjs";
import {PostService} from "../../services/post.service";

@Component({
    templateUrl: "./app/components/post-details/post-details.component.html",
    styleUrls: ["./app/components/post-details/post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {

    post: Post;
    @SessionStorage('auth_token') authToken;
    @SessionStorage('username') username;
    logged: boolean = false;
    userAuth: Subscription;

    constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
                private _sessionStorage: SessionStorageService, private _postService: PostService) { }

    ngOnInit(): void {
        this._activatedRoute.data.forEach((data: { post: Post}) => this.post = data.post);
        window.scrollTo(0, 0);
        if (this.authToken !== null && this.username === this.post.author.username){
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

    plainTextToHtml(text: string): string {
        return `<p>${text.replace(/\n/gi, "</p><p>")}</p>`;
    }

    /*---------------------------------------------------------------------------------------------------------------|
     | ~~~ Red Path ~~~                                                                                              |
     |---------------------------------------------------------------------------------------------------------------|
     | Añade un manejador que navegue a la dirección correspondiente a los posts del autor indicado. Recuerda que    |
     | para hacer esto necesitas inyectar como dependencia el Router de la app. La ruta a navegar es '/posts/users', |
     | pasando como parámetro el identificador del autor.                                                            |
     |---------------------------------------------------------------------------------------------------------------*/

    /*--------------------------------------------------------------------------------------------------------------------|
     | ~~~ Yellow Path ~~~                                                                                                |
     |--------------------------------------------------------------------------------------------------------------------|
     | Añade un manejador que navegue a la dirección correspondiente a los posts de la categoría indicada. Recuerda que   |
     | para hacer esto necesitas inyectar como dependencia el Router de la app. La ruta a navegar es '/posts/categories', |
     | pasando como parámetro el identificador de la categoría.                                                           |
     |--------------------------------------------------------------------------------------------------------------------*/

    showCategoryPosts(category: Category){
        var categoryName = category.name;
        if (categoryName == 'Esto es serio'){
            categoryName = 'EstoEsSerio';
        }else if (categoryName == 'Poor Thing'){
            categoryName = 'PoorThing';
        }
        this._router.navigate(['/posts/categories/', categoryName]);
    }

    showAuthorPosts(user: User){
        this._router.navigate(['/posts/', user.username]);
    }

    editPost(post: Post){
        this._router.navigate(['/edit-post/' + post.author.username + '/' + post.id])
    }

    likeClicked(post: Post){

        var likes = post.likes;
        var newLike={user: {username: this.username}}
        likes.push(newLike);
        var postJson = {
            id: post.id,
            title: post.title,
            intro: post.intro,
            body: post.body,
            publication_date: post.publicationDate,
            author: post.author,
            likes: likes,
            ratings: post.ratings,
            media: post.media,
            categoriees:post.categories,
        };

        this._postService.updatePost(postJson).subscribe((response) => console.log(response));
    }
}
