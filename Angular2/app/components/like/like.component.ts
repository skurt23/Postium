/**
 * Created by skurt on 19/11/16.
 */

import {Component, Input, OnInit} from "@angular/core";
import {Post} from "../../models/post";
import {SessionStorage} from "ng2-webstorage";

@Component({
    selector: 'like',
    templateUrl: './app/components/like/like.component.html',
    styleUrls: ['./app/components/like/like.component.css'],
})
export class LikeComponent implements OnInit{

    @Input() post: Post;
    @SessionStorage('username') username;
    disabled: boolean;

    ngOnInit(){
        console.log(this.post.likes);
        this.disabled = false;
        for (var i in this.post.likes){
            if (this.post.likes[i].user.username === this.username){
                this.disabled = true;
            }

        }
    }

    ngOnChanges(changes: any){
        console.log(changes);
    }

}