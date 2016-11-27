/**
 * Created by skurt on 17/11/16.
 */
import { Pipe, PipeTransform } from '@angular/core';
import {Post} from "../models/post";


@Pipe({
    name: 'title'
})
export class SearchPipe implements PipeTransform{
    transform(posts, term: string){
        return posts.filter(function (post) {
            if (typeof term === 'undefined'){
                return post.title.startsWith('');
            }
            return post.title.toLowerCase().startsWith(term.toLowerCase());
        });
    }
}