import { Category } from "./category";
import { User } from "./user";

export class Post {
    
    private constructor(
        public id: number,
        public title: string,
        public intro: string,
        public body: string,
        public media: string,
        public publicationDate: any,
        public categories: Category[],
        public author: User,
        public likes: any,
        public ratings: number,
        public visible: boolean = false
    ) { }

    static fromJson(json: any): Post {
        return new Post(
            json.id,
            json.title,
            json.intro,
            json.body,
            json.media,
            json.publication_date,
            json.categoriees,
            json.author,
            json.likes,
            json.ratings
        );
    }

    static fromJsonToList(json: any): Post[] {
        return (json as any[]).reduce((posts: Post[], post: Post) => {
            posts.push(Post.fromJson(post));
            return posts;
        }, []);
    }
}
