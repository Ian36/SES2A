import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  loggedIn() {
    this.userService.getLoggedInUser().subscribe(user => {
      this.user = user;
    });
    return this.user ? true : false;
  }

  getUser() {
    return this.user;
  }

  logOut() {
    return null;
  }
}
