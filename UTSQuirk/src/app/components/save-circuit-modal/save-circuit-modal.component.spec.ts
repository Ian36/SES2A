import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCircuitModalComponent } from './save-circuit-modal.component';

describe('SaveCircuitModalComponent', () => {
  let component: SaveCircuitModalComponent;
  let fixture: ComponentFixture<SaveCircuitModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveCircuitModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveCircuitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
