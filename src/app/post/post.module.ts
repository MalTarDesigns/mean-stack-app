import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { FormsModule } from '@angular/forms';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './containers/post/post.component';

@NgModule({
  imports: [SharedModule, FormsModule],
  declarations: [PostCreateComponent, PostListComponent, PostComponent],
  exports: [PostComponent]
})
export class PostModule {}
