import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangmentComponent } from './mangment.component';

describe('MangmentComponent', () => {
  let component: MangmentComponent;
  let fixture: ComponentFixture<MangmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
