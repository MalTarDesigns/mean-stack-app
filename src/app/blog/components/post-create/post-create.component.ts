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
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  createPostFormGroup: FormGroup;
  post: IPost;
  imagePreview: any;
  private postId;
  private mode = 'create';

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
      ],
      image: ['', Validators.compose([Validators.required])]
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe((post: any) => {
          this.post = {
            id: post.id,
            title: post.title,
            content: post.content,
            imagePath: post.imagePath
          };
          this.createPostFormGroup.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath
          });
        }); // unsubscription is handled by angular httpClient
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSubmit() {
    const form = this.createPostFormGroup;
    const post: IPost = {
      id: null,
      title: form.value.title,
      content: form.value.content,
      imagePath: form.value.image
    };
    if (this.mode === 'create') {
      this.postService.addPost(post);
    } else {
      this.postService.updatePost(this.postId, post);
    }

    this.resetForm(form);
  }

  onFileSeclect(event) {
    const form = this.createPostFormGroup;
    form.patchValue({ image: event });
    form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(event);
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
