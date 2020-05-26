import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { SimulatorService } from 'src/app/services/simulator.service';

@Component({
  selector: 'app-save-circuit-modal',
  templateUrl: './save-circuit-modal.component.html',
  styleUrls: ['./save-circuit-modal.component.css']
})
export class SaveCircuitModalComponent implements OnInit {

  fileName: string;
  closeResult = '';

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private eventEmitterService: EventEmitterService,
              private simulatorService: SimulatorService) { }

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

  save() {
    this.simulatorService.saveCircuit(this.fileName).subscribe(
      res => {
        console.log(res);
        this.snackBar.open(this.fileName + ' successfully saved!', '', {
          duration: 2000,
        });
      },
      err => {
        console.log(err);
      }
    );
  }

}
