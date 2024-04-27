import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchematiqueComponent } from './schematique.component';

describe('SchematiqueComponent', () => {
  let component: SchematiqueComponent;
  let fixture: ComponentFixture<SchematiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchematiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchematiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
