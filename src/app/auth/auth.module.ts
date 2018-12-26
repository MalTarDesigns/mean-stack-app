import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutes } from './auth.routes';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [SharedModule, AuthRoutes, FormsModule, ReactiveFormsModule],
  declarations: [LoginComponent]
})
export class AuthModule {}
