import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userList: User[];
  loggedInUser: User;
  username: string;
  password: string;
  incorrectLogin = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.username = 'admin';
    this.password = 'password';
    this.login();
  }

  login() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.userService.getUser(user).subscribe(
      returnUser => {
        this.loggedInUser = returnUser;
        if (this.loggedInUser == null) {
          this.incorrectLogin = true;
        }
        if(this.loggedInUser.userType === 'admin') {
          this.getUserList();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  logout() {
    this.loggedInUser = null;
  }

  getUserList() {
    this.userService.getUsers().subscribe(
      res => {
        const users: User[] = [];
        res.users.forEach(user => {
          console.log(user);
          const newUser: User = {
            username: user.username,
            password: user.password,
            userType: user.userType
          };
          users.push(newUser);
        });
        this.userList = users;
      },
      err => {
        this.userList = [];
        console.log(err);
      }
    );
  }
}
