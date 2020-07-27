import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheManuelleComponent } from './recherche-manuelle.component';

describe('RechercheManuelleComponent', () => {
  let component: RechercheManuelleComponent;
  let fixture: ComponentFixture<RechercheManuelleComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheManuelleComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheManuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
