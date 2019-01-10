import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutes } from './app.routes';
import { AuthIntercepter } from './auth/auth-intercepter';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutes,
    CoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercepter,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
