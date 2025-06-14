import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggationCentersComponent } from './suggation-centers.component';

describe('SuggationCentersComponent', () => {
  let component: SuggationCentersComponent;
  let fixture: ComponentFixture<SuggationCentersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggationCentersComponent]
    });
    fixture = TestBed.createComponent(SuggationCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
