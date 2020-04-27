import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { User } from './_models/User'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  currentUser: User;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  isAdmin() {
    return this.currentUser && this.currentUser.role.toLowerCase() === 'admin';
  }

  needHeader() {
    return this.router.url != '/checkin' && this.router.url != '/login'
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
