import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgicalOperationComponent } from './surgical-operation.component';

describe('SurgicalOperationComponent', () => {
  let component: SurgicalOperationComponent;
  let fixture: ComponentFixture<SurgicalOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurgicalOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurgicalOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
