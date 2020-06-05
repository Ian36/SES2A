import { Component, OnInit } from '@angular/core';
import { CdkDragEnd, CdkDragStart, CdkDragMove,
  CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray,
  transferArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { SimulatorService } from 'src/app/services/simulator.service';
import { AddGate } from 'src/app/models/AddGate';


@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {
  probability: number[] = [0, 0];
  initalStates: string[] = ['|0>', '|1>'];
  selectedInitalState: string[] = ['|0>', '|0>'];
  selectedValue: string[] = [' ', ' ', ' ', ' ', ' ', ' '];
  gates: string[] = [' ', 'x', 'y', 'z', 'h', 's', 't', 'cx', 'cz', 'swap', 'ccx'];

  state = '';
  position = '';
  customers = [
    { name: 'H', age: 23 },
    { name: 'H', age: 27 },
    { name: 'H', age: 26 },
    { name: 'H', age: 30 },
    { name: 'H', age: 42 },
  ];
  inactiveCustomers = [
    {name: 'H', age: 18},
    {name: 'H', age: 16},
    {name: 'H', age: 36}
  ];

  activeCustomers = [
    {name: 'H', age: 10},
    {name: 'H', age: 24}
  ];
  constructor(private simulatorService: SimulatorService) { }

  ngOnInit(): void {
    this.resetCircuit();
    this.resetCircuit();
    this.getProbability();
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

  changeInitialState(state: number) {
    console.log('changeInitialState to ' + this.selectedInitalState[state]);
    this.getProbability();
  }

  addGate(gate: number, inColumn: number, inWire: number) {
    console.log('Adding ' + this.selectedValue[gate] + ' to column ' + inColumn + ', wire ' + inWire);
    const newGate: AddGate = {
      gate: this.selectedValue[gate],
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


  getProbability() {
    const states = [+(this.selectedInitalState[0].substring(1, 2)), +(this.selectedInitalState[1].substring(1, 2))];
    this.simulatorService.getProbability(states).subscribe(
      res => {
        console.log(res);
        this.probability = res;
      },
      err => {
        console.log(err);
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
}

