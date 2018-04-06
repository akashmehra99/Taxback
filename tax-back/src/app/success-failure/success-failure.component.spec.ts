import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessFailureComponent } from './success-failure.component';

describe('SuccessFailureComponent', () => {
  let component: SuccessFailureComponent;
  let fixture: ComponentFixture<SuccessFailureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessFailureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
