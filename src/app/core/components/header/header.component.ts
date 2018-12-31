import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private authSub: Subscription;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.getIsAuthenicated();
    this.authSub = this.auth.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
