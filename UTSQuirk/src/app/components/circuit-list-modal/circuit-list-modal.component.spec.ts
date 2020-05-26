import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitListModalComponent } from './circuit-list-modal.component';

describe('CircuitListModalComponent', () => {
  let component: CircuitListModalComponent;
  let fixture: ComponentFixture<CircuitListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
