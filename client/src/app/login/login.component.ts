import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service'
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NotificationService } from '../_services/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthService,
    private router: Router,
    private notif: NotificationService) { }

  ngOnInit() {
  }

  login() {

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }

    this.authService.login(this.username, this.password)
      .pipe(first()).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['']);

          this.notif.showNotif('Logged in as: ' + this.username, 'CONFIRMATION');
        },
        error => {
          // show a snackbar to user
          this.notif.showNotif('Login Failed', 'FAILED');
          console.log('Error', error);
        });
  }

}
