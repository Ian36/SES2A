import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';



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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddUserModalComponent,
    ViewUserModalComponent,
    ViewCircuitModalComponent,
    SimulatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatTableModule,
    MatSnackBarModule
  ],
  providers: [EventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
