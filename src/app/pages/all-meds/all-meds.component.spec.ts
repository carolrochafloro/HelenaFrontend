import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMedsComponent } from './all-meds.component';

describe('AllMedsComponent', () => {
  let component: AllMedsComponent;
  let fixture: ComponentFixture<AllMedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllMedsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
