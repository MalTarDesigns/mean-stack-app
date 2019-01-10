import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  onLoginSubmit() {
    const form = this.loginFormGroup;
    const user = {
      email: form.value.email,
      password: form.value.password
    };
    this.authService.login(user);
  }
}
