import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddGate } from '../models/AddGate';
import { CircuitFile } from '../models/CircuitFile';
import { CircuitFileList } from '../models/CircuitFileList';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {

  url = 'http://localhost:3000/circuit/';

  constructor(private http: HttpClient) { }

  getProbability(array: number[]): Observable<number[]> {
    console.log(array);
    const endpoint = this.url + 'probability';
    return this.http.post<number[]>(endpoint, array, httpOptions);
  }

  addGate(addGate: AddGate): Observable<string> {
    const endpoint = this.url + 'addGate';
    return this.http.post<string>(endpoint, addGate, httpOptions);
  }

  reset(): Observable<string> {
    const endpoint = this.url + 'reset';
    return this.http.get<string>(endpoint);
  }

  saveCircuit(name: string): Observable<string> {
    const endpoint = this.url + 'save/' + name;
    return this.http.post<string>(endpoint, name);
  }

  getCircuits(): Observable<CircuitFileList> {
    const endpoint = this.url + 'getCircuits';
    return this.http.get<CircuitFileList>(endpoint);
  }

  loadCircuit(id: string): Observable<string> {
    const endpoint = this.url + 'loadCircuit' + id;
    return this.http.get<string>(endpoint);
  }
}
