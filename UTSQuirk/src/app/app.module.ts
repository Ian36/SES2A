import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewUserModalComponent } from './components/view-user-modal/view-user-modal.component';
import { EventEmitter } from 'protractor';
import { EventEmitterService } from './services/event-emitter.service';
import { ViewCircuitModalComponent } from './components/view-circuit-modal/view-circuit-modal.component';
import { SimulatorComponent } from './components/simulator/simulator.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SaveCircuitModalComponent } from './components/save-circuit-modal/save-circuit-modal.component';
import { CircuitListModalComponent } from './components/circuit-list-modal/circuit-list-modal.component';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddUserModalComponent,
    ViewUserModalComponent,
    ViewCircuitModalComponent,
    SimulatorComponent,
    SaveCircuitModalComponent,
    CircuitListModalComponent,
    AddTaskModalComponent
  ],
  imports: [
    DragDropModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatTableModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [EventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
