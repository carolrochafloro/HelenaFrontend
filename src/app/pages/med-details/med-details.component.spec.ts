import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedDetailsComponent } from './med-details.component';

describe('MedDetailsComponent', () => {
  let component: MedDetailsComponent;
  let fixture: ComponentFixture<MedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
