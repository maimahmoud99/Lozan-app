import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationInstructionsComponent } from './installation-instructions.component';

describe('InstallationInstructionsComponent', () => {
  let component: InstallationInstructionsComponent;
  let fixture: ComponentFixture<InstallationInstructionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstallationInstructionsComponent]
    });
    fixture = TestBed.createComponent(InstallationInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
