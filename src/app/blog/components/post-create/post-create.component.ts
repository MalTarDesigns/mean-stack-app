import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  createPostFormGroup: FormGroup;
  post: IPost;
  private postId;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createPostFormGroup = this.fb.group({
      title: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ],
      content: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        // this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postService.getPost(this.postId);
      } else {
        // this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSubmit() {
    const form = this.createPostFormGroup;
    const post: IPost = {
      id: null,
      title: form.value.title,
      content: form.value.content
    };

    this.resetForm(form);
    this.postService.addPost(post);
  }

  private resetForm(formGroup: FormGroup) {
    let control: AbstractControl = null;
    formGroup.reset();
    formGroup.markAsUntouched();
    Object.keys(formGroup.controls).forEach(name => {
      control = formGroup.controls[name];
      control.setErrors(null);
    });
  }
}
