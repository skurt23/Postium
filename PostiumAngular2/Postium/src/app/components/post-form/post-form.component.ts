import {Component, EventEmitter, OnInit, Output, Input, ViewChild} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { Post } from "../../models/post";
import { User } from "../../models/user";

import * as moment from 'moment';
import {Category} from "../../models/category";

@Component({
    selector: "post-form",
    templateUrl: "./post-form.component.html",
    styleUrls: ["./post-form.component.css"]
})
export class PostFormComponent implements OnInit {

    nowDatetimeLocal: string;
    publicationDateScheduled: boolean = false;

    @Input() post: Post;
    @Output() postSubmitted: EventEmitter<any> = new EventEmitter();
    @ViewChild('form') form;

    ngOnInit(): void {
        this.nowDatetimeLocal = this._formatDateToDatetimeLocal(new Date());
        if (typeof this.post !== 'undefined'){
            this.form.title = this.post.title;
            this.form.intro = this.post.intro;
            this.form.body = this.post.body;
        }
    }

    private _formatDateToDatetimeLocal(date: Date) {
        return `
            ${this._fixPad(date.getFullYear(), 4)}-
            ${this._fixPad(date.getMonth() + 1, 2)}-
            ${this._fixPad(date.getDate(), 2)}T
            ${this._fixPad(date.getHours(), 2)}:
            ${this._fixPad(date.getMinutes(), 2)}`.replace(/\n/gi, "").replace(/ /gi, "");
    }

    private _fixPad(datePart: number, length: number): string {
        return `0000${datePart}`.slice(-length);
    }

    private _getPostPublicationDate(formPublicationDate: string): any {
        let publicationDate: string;
        if (this.publicationDateScheduled) {
            publicationDate = new Date(formPublicationDate).toISOString();
            console.log(typeof publicationDate);
            if (typeof publicationDate === 'undefined') {
                publicationDate = new Date().toISOString();
            }
        }
        else {
            publicationDate = new Date().toISOString();
        }

        return publicationDate;
    }

    setScheduling(schedule: boolean = true):void{
        this.publicationDateScheduled = schedule;
    }



    submitPost(form: FormGroup): void {

        /*-------------------------------------------------------------------------------------------------------------|
         | ~~~ Purple Path ~~~                                                                                         |
         |-------------------------------------------------------------------------------------------------------------|
         | Aquí no tienes que hacer nada más allá de comprobar que los datos del formulario se recogen correctamente y |
         | tienen 'forma' de Post. Si no es así, al hacer 'Post.fromJson()' se instanciará un post que no se parece en |
         | nada a lo indicado en el formulario. Por tanto, pon especial atención a que los nombres indicados en los    |
         | distintos elementos del formulario se correspondan con las propiedades de la clase Post.                    |
         |-------------------------------------------------------------------------------------------------------------*/
        let post = {
            id: form.value.id,
            title: form.value.title,
            intro: form.value.intro,
            body: form.value.body,
            publication_date: this._getPostPublicationDate(form.value.publicationDate),
            author: User.defaultUser(),
            likes: 0,
            ratings: 0,
            media: 'resources/images/bread-1510298_640.jpg',
            categoriees:[{
                "id": 1,
                "name": "Poor Thing"
            }, {
                "id": 2,
                "name": "Esto es serio"
            }]
        };

        if (typeof this.post !== 'undefined'){
            post = {
                id: this.post.id,
                title: form.value.title,
                intro: form.value.intro,
                body: form.value.body,
                publication_date: this._getPostPublicationDate(form.value.publicationDate),
                author: this.post.author,
                likes: this.post.likes,
                ratings: this.post.ratings,
                media: this.post.media,
                categoriees:this.post.categories,
            };
        }

        this.postSubmitted.emit(post);
    };
}
