import { NgModule } from '@angular/core';
import { BlogComponent } from './blog.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { BlogRoutes } from './blog.routes';
import { PostService } from './services/post.service';

@NgModule({
  imports: [BlogRoutes, SharedModule, FormsModule, ReactiveFormsModule],
  declarations: [BlogComponent, PostCreateComponent, PostListComponent],
  providers: [PostService]
})
export class BlogModule {}
