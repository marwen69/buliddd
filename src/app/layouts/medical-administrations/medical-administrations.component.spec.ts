import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAdministrationsComponent } from './medical-administrations.component';

describe('MedicalAdministrationsComponent', () => {
  let component: MedicalAdministrationsComponent;
  let fixture: ComponentFixture<MedicalAdministrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalAdministrationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalAdministrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
