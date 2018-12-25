import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class PostService {
  POST_API_URL = "http://localhost:3000/api/posts/";
  private posts: IPost[] = [];
  private postsUpdated = new Subject<IPost[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPosts() {
    this.http
      .get(this.POST_API_URL)
      .pipe(
        map((postData: any) => {
          return postData.map((post: any) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  addPost(post: IPost) {
    return this.http
      .post(this.POST_API_URL, post)
      .subscribe((responseData: any) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  getPost(id: string) {
    return this.http.get(this.POST_API_URL + id);
  }

  updatePost(id: string, title: string, content: string) {
    const post = { id: id, title: title, content: content };
    this.http.put(this.POST_API_URL + id, post).subscribe(res => {
      // const updatedPosts = [...this.posts];
      // const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      // updatedPosts[oldPostIndex] = post;
      // this.posts = updatedPosts;
      // this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }

  deletePost(postId: string) {
    this.http.delete(this.POST_API_URL + postId).subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}
