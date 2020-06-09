import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeFirstComponentFunction = new EventEmitter();
  invokeSimulatorComponentRefreshProbability = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  refreshUserList() {
    this.invokeFirstComponentFunction.emit();
  }

  refreshProbability() {
    console.log('refresh probability');
    this.invokeSimulatorComponentRefreshProbability.emit();
  }
}
