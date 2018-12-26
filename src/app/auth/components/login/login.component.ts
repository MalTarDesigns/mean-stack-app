import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  errorMessage$: Observable<string>;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
    console.log(this.loginFormGroup);
  }

  onLoginSubmit() {
    const form = this.loginFormGroup;
    const user = {
      email: form.value.email,
      password: form.value.password
    };
    console.log(user);
  }
}
