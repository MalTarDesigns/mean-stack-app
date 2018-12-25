import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  createPostFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) {}

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
