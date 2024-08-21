import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayMedicationChipComponent } from './day-medication-chip.component';

describe('DayMedicationChipComponent', () => {
  let component: DayMedicationChipComponent;
  let fixture: ComponentFixture<DayMedicationChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayMedicationChipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayMedicationChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
