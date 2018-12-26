import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_API_URL = 'http://localhost:3000/api/users/';

  constructor(private http: HttpClient) {}

  addUser(user: IAuth) {
    const authData: IAuth = { email: user.email, password: user.password };
    return this.http
      .post(this.USER_API_URL + 'signup', authData)
      .subscribe((responseData: any) => {
        console.log(responseData);
      });
  }

  login(user: IAuth) {
    const authData: IAuth = { email: user.email, password: user.password };
    return this.http
      .post(this.USER_API_URL + 'login', authData)
      .subscribe((responseData: any) => {
        console.log(responseData);
      });
  }
}
