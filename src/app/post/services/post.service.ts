import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PostService {
  private posts: IPost[] = [];
  private postsUpdated = new Subject<IPost[]>();

  constructor() {}

  getPosts() {
    return [...this.posts];
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
