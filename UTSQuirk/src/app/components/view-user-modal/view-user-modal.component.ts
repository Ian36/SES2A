import { Component, OnInit , Input} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitter } from 'events';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
@Component({
  selector: 'app-view-user-modal',
  templateUrl: './view-user-modal.component.html',
  styleUrls: ['./view-user-modal.component.css']
})
export class ViewUserModalComponent implements OnInit {
  @Input() message: User;
  closeResult = '';
  posts: Post[];
  displayedColumns: string[] = ['title', 'view'];

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
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

  getPosts() {
    this.postService.getPosts(this.message).subscribe(
      res => {
        console.log(res);
        this.posts = res;
      },
      err => console.log(err)
    );
  }
}
