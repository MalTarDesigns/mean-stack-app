import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_API_URL = 'http://localhost:3000/api/users/';
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getIsAuthenicated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  addUser(user: IAuth) {
    const authData: IAuth = { email: user.email, password: user.password };
    return this.http.post(this.USER_API_URL + 'signup', authData).subscribe((responseData: any) => {
      console.log(responseData);
    });
  }

  login(user: IAuth) {
    const authData: IAuth = { email: user.email, password: user.password };
    return this.http.post(this.USER_API_URL + 'login', authData).subscribe((responseData: any) => {
      const token = responseData.token;
      this.token = token;
      if (token) {
        localStorage.setItem('token', token);
        this.authStatusListener.next(true);
        this.router.navigate(['/']);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }
}
