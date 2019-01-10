import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_API_URL = 'http://localhost:3000/api/users/';
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getIsAuthenicated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  autoAuth() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) { // A future date
      // Set token timer
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
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
      const expireTokenTime = responseData.expiresIn;
      if (token) {
        // Start expiration timer
        this.setAuthTimer(expireTokenTime);

        // Construct expirationDate
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expireTokenTime * 1000);

        this.saveAuthData(token, expirationDate);
        this.authStatusListener.next(true);
        this.router.navigate(['/']);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log(`Auth Timer Expires in: ${duration} seconds`);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
}
