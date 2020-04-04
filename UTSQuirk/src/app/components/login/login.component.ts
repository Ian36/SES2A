import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFail = 0;
  loginUserData = {username: '', password: ''};
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.userService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        (async () => {
          this.loginFail = 2;
          await this.delay(3000);
          this.router.navigate(['/']);
          }
        )();
      },
      err => this.loginFail = 1
    );
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.loginUser();
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
