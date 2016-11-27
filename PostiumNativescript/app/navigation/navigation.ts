import { NavigationItem } from './navigationItem';

export var ITEMS: NavigationItem[] = [
    {
        "title": "Postium",
        "path": "",
        "subItems": [
            {
                "title": "Log in",
                "path": "LoginComponent",
                "subItems": []
            },
            {
                "title": "Posts",
                "path": "PostListComponent",
                "subItems": []
            },
            {
                "title": "Author Posts",
                "path": "AuthorPostListComponent",
                "subItems": []
            },
            {
                "title": "Category Posts",
                "path": "CategoryPostListComponent",
                "subItems": []
            },
            {
                "title": "Log Out",
                "path": "LogOutComponent",
                "subItems": []
            },
            {
                "title": "Nuevo Post",
                "path": "NewStoryComponent",
                "subItems": []
            },
            {
                "title": "Editar Post",
                "path": "UpdateStoryComponent",
                "subItems": []
            }]
    }
];