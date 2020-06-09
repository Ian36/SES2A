import { Component, OnInit, Input } from '@angular/core';
import {
  CdkDragEnd, CdkDragStart, CdkDragMove,
  CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray,
  transferArrayItem, CdkDrag, CdkDropList, copyArrayItem
} from '@angular/cdk/drag-drop';
import { SimulatorService } from 'src/app/services/simulator.service';
import { AddGate } from 'src/app/models/AddGate';
import { User } from 'src/app/models/User';
import { EventEmitterService } from 'src/app/services/event-emitter.service';


@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {
  todo = ['x', 'y', 'z', 'c'];
  done: string[][] = [[], []];
  trash = [];
  dragPosition = { x: 0, y: 0 };

  @Input() message;
  loggedInUser: User;
  probability: number[] = [0, 0];
  initalStates: string[] = ['|0>', '|1>'];
  selectedInitalState: string[] = ['|0>', '|0>'];
  selectedValue: string[] = [' ', ' ', ' ', ' ', ' ', ' '];
  gates: string[] = [' ', 'x', 'y', 'z', 'h', 's', 't', 'cx', 'cz', 'swap', 'ccx'];

  circuit;
  state = '';
  bigState;
  position = '';
  customers = [
    { name: 'H', age: 23 },
    { name: 'H', age: 27 },
    { name: 'H', age: 26 },
    { name: 'H', age: 30 },
    { name: 'H', age: 42 },
  ];
  inactiveCustomers = [
    { name: 'H', age: 18 },
    { name: 'H', age: 16 },
    { name: 'H', age: 36 }
  ];

  activeCustomers = [
    { name: 'H', age: 10 },
    { name: 'H', age: 24 }
  ];

  displayedColumns: string[] = ['Task Name', 'View', 'Submit'];


  constructor(private simulatorService: SimulatorService, private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
    console.log(this.eventEmitterService.subsVar);
    if (this.eventEmitterService.subsVar !== undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeSimulatorComponentRefreshProbability.subscribe(() => {
          console.log('getting probablity');
          this.getProbability();
          this.getCircuit();
        });
    }

    this.resetCircuit();
    this.resetCircuit();
    this.getProbability();
    this.loggedInUser = this.message;
    console.log(this.message);
    console.log(this.loggedInUser.username);
  }

  resetCircuit() {
    this.simulatorService.reset().subscribe(
      res => {
        console.log(res);
        this.selectedInitalState = ['|0>', '|0>'];
        this.selectedValue = [' ', ' ', ' ', ' ', ' ', ' '];
      },
      err => {
        console.log('error: ' + err);
      }
    );
  }

  getState() {
    this.simulatorService.getState().subscribe(
      res => {
        console.log(res);
        this.bigState = res.split('%');
      });
  }

  changeInitialState(state: number) {
    if (this.selectedInitalState[state] === '|0>') {
      this.selectedInitalState[state] = '|1>';
    } else {
      this.selectedInitalState[state] = '|0>';
    }

    console.log('changeInitialState to ' + this.selectedInitalState[state]);
    this.getProbability();
  }

  addGate(gate: number, inColumn: number, inWire: number) {
    console.log('Adding ' + this.gates[gate] + ' to column ' + inColumn + ', wire ' + inWire);
    const newGate: AddGate = {
      gate: this.gates[gate],
      column: inColumn,
      wire: inWire
    };
    this.simulatorService.addGate(newGate).subscribe(
      res => {
        console.log('success: ' + res);
        this.getProbability();
      }, err => {
        console.log('error: ' + err);
      }
    );
  }

  increaseWire() {
    this.selectedInitalState.push('|0>');
    this.done.push([]);
    this.probability.push(0);
    this.getProbability();
  }

  decreaseWire() {
    this.probability.pop();
    this.selectedInitalState.pop();
    this.done.pop();
    this.getProbability();
  }

  getProbability() {
    const states = [];
    this.selectedInitalState.forEach(sis => {
      states.push(+(sis.substring(1, 2)));
    });
    this.simulatorService.getProbability(states).subscribe(
      res => {
        console.log(res);
        this.probability = res;
        this.getState();
      },
      err => {
        console.log(err);
      }
    );
  }

  getCircuit() {
    this.simulatorService.getCircuit().subscribe(
      res => {
        const circuit: string[][] = [];
        console.log('gates: ' + res[0][0].name);
        /* this.circuit.forEach(wire => {
          const wireInput: string[] = [];
          wire.forEach( gate => {
            wireInput.push(gate.name);
          });
          circuit.push(wireInput);
        });
        console.log(circuit);
        this.done = circuit; */
        var i;
        for (i = 0; i < res.length; i++) {
          var j;
          const wireInput: string[] = [];
          for(j = 0; j < res[i].length; j++) {
              if(res[i][j] !== null) {
                wireInput.push(res[i][j].name);
              }
          }
          circuit.push(wireInput);
        }
        this.done = circuit;
        console.log(this.done);
      }
    );
  }

  dragStarted(event: CdkDragStart) {
    this.state = 'start dragging';
    console.log('start dragging');
  }

  dragEnded(event: CdkDragEnd) {
    this.state = 'end dragging';
    console.log('end dragging');
  }

  dragMoved(event: CdkDragMove) {
    console.log('dragMoved');
    this.position = `> Position X: ${event.pointerPosition.x} - Y: ${event.pointerPosition.y}`;
  }

  dragEntered(event: CdkDragEnter) {
    console.log(`drag:put '${event.item.data}' into '${event.container.id}' `);
  }

  dragExited(event: CdkDragExit) {
    console.log(`drag:drag '${event.item.data}' from '${event.container.id}'  `);
  }

  dropListEntered(event: CdkDragEnter) {
    console.log(`drop:'${event.container.id}' from '${event.item.data}'`);
  }

  dropListExited(event: CdkDragExit) {
  }

  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.customers, event.previousIndex, event.currentIndex);
  }

  drop1(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(
        event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }

  predicate(drag: CdkDrag, drop: CdkDropList) {
    console.log('predicate:', drag, drop);
    return drag.data.age >= 18;
  }

  dropListSorted(event: CdkDropList) {
    console.log('Sorted:', event);
  }

  dropit(event: CdkDragDrop<string[]>) {
    console.log('dropped it');
    console.log(event.container.id);
    if (event.previousContainer === event.container && event.container.id !== 'contaner1') {
      console.log('moving gate around wire');
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (!isNaN(+(event.container.id)) && event.previousContainer.id === 'contaner1') {
        console.log('adding gate to wire');
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        console.log('gate number: ' + event.previousIndex);
        this.addGate(event.previousIndex, event.currentIndex, +(event.container.id));
      }
      if (!isNaN(+(event.container.id)) && event.previousContainer.id !== 'contaner1') {
        console.log('adding gate to wire');
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        console.log('gate number: ' + event.previousIndex);
        let gateValue;
        let counter = 0;
        this.gates.forEach(g => {
          if (g === event.container.data[0]) {
            gateValue  = counter;
          } else {
            counter++;
          }
        });
        this.addGate(0, event.previousIndex, +(event.previousContainer.id));
        this.addGate(counter, event.currentIndex, +(event.container.id));
      }
      if (event.container.id === 'contaner3') {
        console.log('deleting gate on wire');
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        this.addGate(0, event.currentIndex, +(event.previousContainer.id));
      }
    }
    this.trash.length = 0;

    console.log(this.done);
    this.getProbability();
  }

  printPosition() {
    console.log(this.dragPosition);
  }

  dragEnd($event: CdkDragEnd) {
    console.log($event.source.getFreeDragPosition());
  }
}


