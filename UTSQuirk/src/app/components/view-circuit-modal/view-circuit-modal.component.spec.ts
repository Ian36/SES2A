import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCircuitModalComponent } from './view-circuit-modal.component';

describe('ViewCircuitModalComponent', () => {
  let component: ViewCircuitModalComponent;
  let fixture: ComponentFixture<ViewCircuitModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCircuitModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCircuitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
