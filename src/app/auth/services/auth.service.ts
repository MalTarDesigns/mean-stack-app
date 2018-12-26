import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_API_URL = 'http://localhost:3000/api/users/';

  constructor(private http: HttpClient) {}

  addUser(user: IAuth) {
    const newUser = { email: user.email, password: user.password };
    return this.http
      .post(this.USER_API_URL + 'signup', newUser)
      .subscribe((responseData: any) => {
        console.log(responseData);
      });
  }
}
