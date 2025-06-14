import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationGuaranteeComponent } from './activation-guarantee.component';

describe('ActivationGuaranteeComponent', () => {
  let component: ActivationGuaranteeComponent;
  let fixture: ComponentFixture<ActivationGuaranteeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivationGuaranteeComponent]
    });
    fixture = TestBed.createComponent(ActivationGuaranteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
