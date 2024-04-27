import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WouldComponent } from './would.component';

describe('WouldComponent', () => {
  let component: WouldComponent;
  let fixture: ComponentFixture<WouldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WouldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WouldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
