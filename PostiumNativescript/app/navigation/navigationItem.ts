export class NavigationItem {
    constructor(public title?: string, public path?: string, public subItems?: Array<NavigationItem>) {
    }
}