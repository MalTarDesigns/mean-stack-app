import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService {
  private posts: IPost[] = [];
  private postsUpdated = new Subject<IPost[]>();

  constructor(private http: HttpClient) {}
  POST_API_URL = 'http://localhost:3000/api/posts';

  getPosts() {
    this.http.get(this.POST_API_URL).subscribe((postData: any) => {
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts]);
    });
    // return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: IPost) {
    console.log(post);

    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
