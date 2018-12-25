import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  private postSub: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts();
    this.postSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: IPost[]) => (this.posts = posts));
  }

  onDelete(postId: string) {
    const c = confirm('Are you sure you want to delete this post?');
    if (c === true) {
      this.postService.deletePost(postId);
    }
    return;
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
