import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseOrderComponent } from './base-order.component';

describe('BaseOrderComponent', () => {
  let component: BaseOrderComponent;
  let fixture: ComponentFixture<BaseOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseOrderComponent]
    });
    fixture = TestBed.createComponent(BaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
