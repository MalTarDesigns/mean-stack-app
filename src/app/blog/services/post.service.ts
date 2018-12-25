import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class PostService {
  POST_API_URL = 'http://localhost:3000/api/posts/';
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
              id: post._id,
              imagePath: post.imagePath
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
    const postData = new FormData(); // needed to upload files to backend
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', post.imagePath, post.title);
    return this.http
      .post(this.POST_API_URL, postData)
      .subscribe((responseData: any) => {
        const newPost: IPost = {
          id: responseData.post.id,
          title: post.title,
          content: post.content,
          imagePath: responseData.post.imagePath
        };
        this.posts.push(newPost);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  getPost(id: string) {
    return this.http.get(this.POST_API_URL + id);
  }

  updatePost(id: string, updatedPost: IPost) {
    let postData: IPost | FormData;
    if (typeof updatedPost.imagePath === 'object') {
      postData = new FormData(); // needed to upload files to backend
      postData.append('id', id);
      postData.append('title', updatedPost.title);
      postData.append('content', updatedPost.content);
      postData.append('image', updatedPost.imagePath, updatedPost.title);
    } else {
      postData = {
        id: id,
        title: updatedPost.title,
        content: updatedPost.content,
        imagePath: updatedPost.imagePath
      };
    }
    this.http.put(this.POST_API_URL + id, postData).subscribe(res => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
      const post: IPost = {
        id: id,
        title: updatedPost.title,
        content: updatedPost.content,
        imagePath: ''
      };
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
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
