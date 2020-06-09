import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitterService } from 'src/app/services/event-emitter.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  name = 'quirk';
  url = 'https://algassert.com/quirk#circuit={%22cols%22:[[1,%22%E2%80%A2%22]]}';
  urlSafe: SafeResourceUrl;

  userList: User[];
  loggedInUser: User;
  username: string;
  password: string;
  incorrectLogin = false;

  displayedColumns: string[] = ['id', 'username', 'Type', 'View', 'Delete'];

  constructor(
    private userService: UserService,
    public sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
    if (this.eventEmitterService.subsVar === undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
        invokeFirstComponentFunction.subscribe((name: string) => {
          this.getUserList();
        });
    }

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

    this.username = 'user2';
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
        } else {
          if (this.loggedInUser.userType === 'admin') {
            this.getUserList();
          }
          this.incorrectLogin = false;
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
            userId: user._id,
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

  getUrl() {
    // const url = document.getElementById('quirk') as HTMLIFrameElement;
    // console.log(url.contentWindow.location.href);

    this.snackBar.open('Save currently unavailable!', '', {
      duration: 2000,
    });
  }

  deleteUser(user: User) {

    if (this.username === user.username) {
      this.snackBar.open('Cannot delete yourself!', '', {
        duration: 2000,
      });
    } else {
      this.userService.delete(user).subscribe(
        res => {
          console.log(res);
          this.snackBar.open('User Successfully deleted!', '', {
            duration: 2000,
          });
          this.getUserList();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
