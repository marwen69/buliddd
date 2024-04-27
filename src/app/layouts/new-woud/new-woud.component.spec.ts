import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWoudComponent } from './new-woud.component';

describe('NewWoudComponent', () => {
  let component: NewWoudComponent;
  let fixture: ComponentFixture<NewWoudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWoudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWoudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
