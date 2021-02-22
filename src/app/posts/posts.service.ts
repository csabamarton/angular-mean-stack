import {Post} from './post.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
 private posts: Post[] = [];
 private postsUpdated = new Subject<Post[]>();

 constructor(private http: HttpClient) {}

 getPosts() {
   this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
     .pipe(map(postData => {
       return postData.posts.map((post: { title: any; content: any; _id: any; }) => {
         return {
           title: post.title,
           content: post.content,
           id: post._id
         };
       });
     }))
     .subscribe((transformedPosts) => {
       this.posts = transformedPosts.posts;
       this.postsUpdated.next([...this.posts]);
     });
 }

 getPostUpdateListener() {
   return this.postsUpdated.asObservable();
 }

 addPost(title: string, content: string) {
   const post: Post = {id: '', title, content};
   this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
     .subscribe((responseData) => {
       console.log(responseData);
       this.posts.push(post);
       this.postsUpdated.next([...this.posts]);
     });
 }
}
