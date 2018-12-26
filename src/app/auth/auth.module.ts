import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutes } from './auth.routes';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  imports: [SharedModule, AuthRoutes, FormsModule, ReactiveFormsModule],
  declarations: [LoginComponent, SignupComponent]
})
export class AuthModule {}
