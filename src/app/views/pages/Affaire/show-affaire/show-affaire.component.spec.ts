import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAffaireComponent } from './show-affaire.component';

describe('ShowAffaireComponent', () => {
  let component: ShowAffaireComponent;
  let fixture: ComponentFixture<ShowAffaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAffaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAffaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
