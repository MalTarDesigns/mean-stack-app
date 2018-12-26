import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.signupFormGroup = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  onSignupSubmit() {
    const form = this.signupFormGroup;
    const user = {
      email: form.value.email,
      password: form.value.password
    };
    console.log(user);
  }
}
