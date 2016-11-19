import {Component, Input, OnInit} from "@angular/core";

import { Post } from "../../models/post";
import {User} from "../../models/user";
import {Route, Router} from "@angular/router";

@Component({
    selector: "posts-list",
    templateUrl: "./app/components/posts-list/posts-list.component.html"
})
export class PostsListComponent implements OnInit{

    @Input() posts: Post[];
    @Input() searchPost: string;
    SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

    constructor(private _router: Router){

    }

    ngOnInit(){
        for (var i=0; i<this.posts.length; i++){
            this.posts[i].visible = false
        }
        this.posts[0].visible = true;
    }

    /*------------------------------------------------------------------------------------------------------------------|
     | ~~~ Red Path ~~~                                                                                                 |
     |------------------------------------------------------------------------------------------------------------------|
     | Maneja el evento del componente PostPreviewComponent que indica la selección del autor de un post y navega a la  |
     | dirección correspondiente. Recuerda que para hacer esto necesitas inyectar como dependencia el Router de la app. |
     | La ruta a navegar es '/posts/users', pasando como parámetro el identificador del autor.                          |
     |------------------------------------------------------------------------------------------------------------------*/

    /*-----------------------------------------------------------------------------------------------------------------|
     | ~~~ Green Path ~~~                                                                                              |
     |-----------------------------------------------------------------------------------------------------------------|
     | Maneja el evento del componente PostPreviewComponent que indica la selección de un post y navega a la dirección |
     | correspondiente. Recuerda que para hacer esto necesitas inyectar como dependencia el Router de la app.  La ruta |
     | a navegar es '/posts', pasando como parámetro el identificador del post.                                        |
     |-----------------------------------------------------------------------------------------------------------------*/

    showAuthorPosts(user: User){
        this._router.navigate(["/posts/" + user.username]);
    }

    showPostDetail(post: Post){
        this._router.navigate(["/posts/" + post.author.username + '/' + post.id]);
    }

    swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
        // out of range
        if (currentIndex > this.posts.length || currentIndex < 0) return;

        let nextIndex = 0;

        // swipe right, next avatar
        if (action === this.SWIPE_ACTION.RIGHT) {
            const isLast = currentIndex === this.posts.length - 1;
            nextIndex = isLast ? 0 : currentIndex + 1;
        }

        // swipe left, previous avatar
        if (action === this.SWIPE_ACTION.LEFT) {
            const isFirst = currentIndex === 0;
            nextIndex = isFirst ? this.posts.length - 1 : currentIndex - 1;
        }

        // toggle avatar visibility
        this.posts.forEach((x, i) => x.visible = (i === nextIndex));
    }
}
