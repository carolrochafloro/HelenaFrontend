import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMedComponent } from './new-med.component';

describe('NewMedComponent', () => {
  let component: NewMedComponent;
  let fixture: ComponentFixture<NewMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
