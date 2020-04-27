import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserModalComponent } from './view-user-modal.component';

describe('ViewUserModalComponent', () => {
  let component: ViewUserModalComponent;
  let fixture: ComponentFixture<ViewUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
