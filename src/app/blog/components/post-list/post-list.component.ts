import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  isLoggedIn = false;
  private postSub: Subscription;
  private authSub: Subscription;

  constructor(private postService: PostService, private auth: AuthService) { }

  ngOnInit() {
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdateListener().subscribe((posts: IPost[]) => {
      this.posts = posts;
    });
    this.isLoggedIn = this.auth.getIsAuthenicated();
    this.authSub = this.auth.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
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
