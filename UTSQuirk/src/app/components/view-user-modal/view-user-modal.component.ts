import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-user-modal',
  templateUrl: './view-user-modal.component.html',
  styleUrls: ['./view-user-modal.component.css']
})
export class ViewUserModalComponent implements OnInit {
  username: string;
  password: string;
  usertype: string;
  usertypes: string[] = ['admin', 'user'];
  closeResult = '';

  constructor(private modalService: NgbModal, private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  registerNewUser() {
    console.log(this.username + this.password + this.usertype);
    const newUser: User = { username: this.username, password: this.password, userType: 'user' };
    this.userService.register(newUser).subscribe(
      res => {
        console.log(res);
        this.snackBar.open('User successfully created!', '', {
          duration: 2000,
        });
      },
      err => {
        console.log(err);
      }
    );
  }
}
