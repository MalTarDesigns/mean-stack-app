import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

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
    const user: IAuth = {
      email: form.value.email,
      password: form.value.password
    };
    this.authService.addUser(user);
  }
}
