/**
 * Created by skurt on 26/11/16.
 */
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'new-story',
    templateUrl: 'new-story.component.html'
})
export class NewStoryComponent implements OnInit {

    private _sub: any;
    private _title: any;
    constructor(private _route: ActivatedRoute) { }

    ngOnInit() {
        this._sub = this._route.data.subscribe(data => {
            this._title = data['title'];
        });
    }
}