import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  title = '';
  content = '';
  @Output() postAdded = new EventEmitter<IPost>();

  ngOnInit() {}

  addPost() {
    const post: IPost = {
      title: this.title,
      content: this.content
    };
    this.postAdded.emit(post);
  }
}
