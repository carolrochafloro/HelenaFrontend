import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { INewMedication } from 'app/interfaces/meds/INewMedication';

@Component({
  selector: 'app-new-time-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, CommonModule, FormsModule],
  templateUrl: './new-time-dialog.component.html',
  styleUrl: './new-time-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTimeDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewTimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { medication: INewMedication }
  ) {}
  ngOnInit(): void {}

  // ========= Variables =========

  newTimes = new Array(this.data.medication.Recurrency).fill(null);
  weekDays = new Array(0).fill(null);
  newDates = new Array(this.data.medication.Recurrency).fill(null);
  newNumberOfTimes = new Array(0).fill(null);
  isMaxSelected: boolean = false;
  buttonDisabled: boolean = false;

  numberOfTimes: number = 0;

  // ========= DAILY =========

  saveTimes() {
    this.data.medication.Times.push({
      weekDay: this.weekDays,
      time: this.newTimes,
      dates: [],
    });
    this.dialogRef.close(this.data.medication.Times);
  }

  // ========= WEEKLY =========

  // --- Select weekdays

  onCheckBoxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = parseInt(checkbox.value, 10);

    if (checkbox.checked) {
      this.weekDays.push(value);
    } else {
      const index = this.weekDays.indexOf(value);

      if (index > -1) {
        this.weekDays.splice(index, 1);
      }
    }

    if (this.weekDays.length > this.data.medication.Recurrency - 1) {
      this.isMaxSelected = true;
    } else {
      this.isMaxSelected = false;
    }
  }

  // --- Choose weekly times

  chooseNumberOfTimes() {
    this.newNumberOfTimes.length = this.numberOfTimes;
  }

  // --- Save data

  saveWeeklyTimes() {
    this.data.medication.Times.push({
      weekDay: this.weekDays,
      time: this.newTimes,
      dates: [],
    });

    this.dialogRef.close(this.data.medication.Times);
  }

  // ========= MONTHLY / YEARLY =========

  saveMonthlyYearlyTimes() {
    this.data.medication.Times.push({
      weekDay: [],
      time: this.newTimes,
      dates: this.newDates,
    });
    this.dialogRef.close(this.data.medication.Times);
  }
}
