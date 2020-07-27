import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSourcerComponent } from './show-sourcer.component';

describe('ShowSourcerComponent', () => {
  let component: ShowSourcerComponent;
  let fixture: ComponentFixture<ShowSourcerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSourcerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSourcerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
