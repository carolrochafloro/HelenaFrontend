import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesDialogComponent } from './times-dialog.component';

describe('TimesDialogComponent', () => {
  let component: TimesDialogComponent;
  let fixture: ComponentFixture<TimesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
