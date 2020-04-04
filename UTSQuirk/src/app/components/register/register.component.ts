import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData = {username: '', password: '', userType: ''};

  constructor(private userService: UserService, private router: Router) { }
  // 0 - no message, 1 - registration failed, 2 - regsitration successful
  registrationFail = 0;
  ngOnInit(): void {
  }
  registerUser() {
    console.log(this.registerUserData);
    this.userService.registerUser(this.registerUserData).
      subscribe(
        res => {
          localStorage.setItem('token', res.token);
          (async () => {
            this.registrationFail = 2;
            await this.delay(3000);
            this.router.navigate(['/']);
            }
          )();
        },
        err => this.registrationFail = 1
      );
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  /*
  TODO: Fix the radio buttons. Currently unable to obtain data from the radio button
   in the html so this is the a temporary fix
  */
  chooseStaff() {
    this.registerUserData.userType = 'staff';
  }
  chooseStudent() {
    this.registerUserData.userType = 'student';
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.registerUser();
    }
  }
}
