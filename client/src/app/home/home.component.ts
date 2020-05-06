import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../../../../models/User';
import { Router } from "@angular/router";
import { ObjectUnsubscribedError } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.currentUserValue;
   }

  ngOnInit() {
    if (this.currentUser.role.toLowerCase() === 'company') {
      this.router.navigate(["/company", {id: this.currentUser._id}]);
      console.log(this.currentUser);
    }
  }



}
