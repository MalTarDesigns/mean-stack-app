import { Component } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  posts: IPost[] = [];

  postAdded(post: IPost) {
    this.posts.push(post);
  }
}
