import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCvDetailComponent } from './add-cv-detail.component';

describe('AddCvDetailComponent', () => {
  let component: AddCvDetailComponent;
  let fixture: ComponentFixture<AddCvDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCvDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCvDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
