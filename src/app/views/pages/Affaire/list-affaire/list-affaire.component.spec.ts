import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAffaireComponent } from './list-affaire.component';

describe('ListAffaireComponent', () => {
  let component: ListAffaireComponent;
  let fixture: ComponentFixture<ListAffaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAffaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAffaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
