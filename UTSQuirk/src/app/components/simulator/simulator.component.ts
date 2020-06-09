import { Component, OnInit } from '@angular/core';
import {
  CdkDragEnd, CdkDragStart, CdkDragMove,
  CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray,
  transferArrayItem, CdkDrag, CdkDropList, copyArrayItem
} from '@angular/cdk/drag-drop';
import { SimulatorService } from 'src/app/services/simulator.service';
import { AddGate } from 'src/app/models/AddGate';


@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {
  todo = ['x', 'y', 'z', 'c'];
  done: string[][] = [[], []];
  trash = [];
  dragPosition = {x: 0, y: 0};

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
    { name: 'H', age: 18 },
    { name: 'H', age: 16 },
    { name: 'H', age: 36 }
  ];

  activeCustomers = [
    { name: 'H', age: 10 },
    { name: 'H', age: 24 }
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

  dropit(event: CdkDragDrop<string[]>) {
    console.log('dropped it');
    console.log(event.container.id);
    if (event.previousContainer === event.container && event.container.id !== 'contaner1') {
      console.log('moving gate around wire');
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (!isNaN(+(event.container.id))) {
        console.log('adding gate to wire');
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        console.log('gate number: ' + event.previousIndex);
        this.addGate(event.previousIndex, event.currentIndex, +(event.container.id));
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


