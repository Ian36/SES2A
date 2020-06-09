import { Component, OnInit , Input} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitter } from 'events';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
import { SimulatorService } from 'src/app/services/simulator.service';
import { CircuitFile } from 'src/app/models/CircuitFile';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

@Component({
  selector: 'app-circuit-list-modal',
  templateUrl: './circuit-list-modal.component.html',
  styleUrls: ['./circuit-list-modal.component.css']
})
export class CircuitListModalComponent implements OnInit {
  @Input() message;
  loggedInUser :User;
  circuits: CircuitFile[];
  closeResult = '';
  displayedColumns: string[] = ['fileName', 'view'];


  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private postService: PostService,
    private simulatorService: SimulatorService,
    private eventEmitterService: EventEmitterService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.message;
    this.loadCircuits();
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

  loadCircuits() {
    this.simulatorService.getCircuits(this.loggedInUser.username).subscribe(
      res => {
        console.log(res.circuits);
        this.circuits = res.circuits;
      }
    );
  }

  loadSelectedCircuit(circuit: CircuitFile) {
    console.log("Reachhed cls.ts");
    console.log(circuit);
    console.log(circuit.fileName);
 
    this.simulatorService.loadCircuit(circuit.fileName, this.loggedInUser.username).subscribe(
      res => {
        console.log(res);
        this.eventEmitterService.refreshProbability();
      }
    );
  }
}
