import { Component, OnInit, OnDestroy } from "@angular/core";
import { NavigationItem } from "../navigationItem";
import { NavigationItemService } from "../navigationItem.service";
import * as frameModule from "ui/frame";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: "tk-examples",
    templateUrl: "examples-list.component.html",
    styleUrls: ["examples-list.component.css"]
})
export class ExamplesListDepth1Component implements OnInit, OnDestroy {
    private _currentExample: NavigationItem;
    private _hasBack: boolean;
    private _sub: any;

    constructor(private _router: Router, private _route: ActivatedRoute, private _exampleItemsService: NavigationItemService) {

    }

    ngOnInit() {
        this._sub = this._route.params.subscribe(params => {
            var parentTitle = params['parentTitle'];
            var tappedTitle = params['tappedTitle'];
            this.hasBack = false;
            this._currentExample = this._exampleItemsService.getParentExampleItem(0);
        });
    }

    ngOnDestroy() {
        this._sub.unsubscribe();
    }

    public get currentExample(): NavigationItem {
        return this._currentExample;
    }

    public set currentExample(value: NavigationItem) {
        this._currentExample = value;
    }

    public get hasBack(): boolean {
        return this._hasBack;
    }

    public set hasBack(value: boolean) {
        this._hasBack = value;
    }

    public onNavigationItemTap(args) {
        var itemIndex = args.itemIndex;
        var tappedItem = this._currentExample.subItems[itemIndex];
        if (tappedItem.subItems.length === 0) {
            this._router.navigateByUrl(tappedItem.path);
        } else {
            this._router.navigate(['/examples-depth-2', this._currentExample.title, tappedItem.title]);
        }
    }

    public onNavigationButtonTap() {
        frameModule.topmost().goBack();
    }
}


@Component({
    moduleId: module.id,
    selector: "tk-examples-depth-2",
    templateUrl: "examples-list.component.html",
    styleUrls: ["examples-list.component.css"]
})
export class ExamplesListDepth2Component implements OnInit, OnDestroy {
    private _currentExample: NavigationItem;
    private _hasBack: boolean;
    private _sub: any;

    constructor(private _router: Router, private _route: ActivatedRoute, private _exampleItemsService: NavigationItemService) {

    }

    ngOnInit() {
        this._sub = this._route.data.subscribe(params => {
            var parentTitle = params['parentTitle'];
            var tappedTitle = params['tappedTitle'];
            this.hasBack = true;
            this._currentExample = this._exampleItemsService.getChildExampleItem(parentTitle, tappedTitle, this._exampleItemsService.getAllExampleItems());
        });

    }

    ngOnDestroy() {
        this._sub.unsubscribe();
    }

    public get currentExample(): NavigationItem {
        return this._currentExample;
    }

    public set currentExample(value: NavigationItem) {
        this._currentExample = value;
    }

    public get hasBack(): boolean {
        return this._hasBack;
    }

    public set hasBack(value: boolean) {
        this._hasBack = value;
    }

    public onNavigationItemTap(args) {
        var itemIndex = args.itemIndex;
        var tappedItem = this._currentExample.subItems[itemIndex];
        if (tappedItem.subItems.length === 0) {
            this._router.navigateByUrl(tappedItem.path);
        } else {
            this._router.navigate(['/posts', this._currentExample.title, tappedItem.title]);
        }
    }

    public onNavigationButtonTap() {
        frameModule.topmost().goBack();
    }
}

