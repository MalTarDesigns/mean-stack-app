import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './post.component';
import { PostService } from './services/post.service';

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  declarations: [PostCreateComponent, PostListComponent, PostComponent],
  exports: [PostComponent],
  providers: [PostService]
})
export class PostModule {}
