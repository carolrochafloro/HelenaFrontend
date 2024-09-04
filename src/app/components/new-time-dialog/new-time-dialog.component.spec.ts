import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTimeDialogComponent } from './new-time-dialog.component';

describe('NewTimeDialogComponent', () => {
  let component: NewTimeDialogComponent;
  let fixture: ComponentFixture<NewTimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTimeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
