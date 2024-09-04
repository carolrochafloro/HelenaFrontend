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
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { INewMedication } from 'app/interfaces/meds/INewMedication';

@Component({
  selector: 'app-new-time-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './new-time-dialog.component.html',
  styleUrl: './new-time-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTimeDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewTimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { medication: INewMedication }
  ) {}

  newTimes = new Array(this.data.medication.Recurrency).fill(null);
  weekDays = new Array(0).fill(null);
  newDates = new Array(this.data.medication.Recurrency).fill(null);
  isMaxSelected: boolean = false;

  saveTimes() {
    var index = 0;
    this.newTimes.forEach((item) => {
      this.data.medication.Times[index] = item;
      index++;
    });

    this.dialogRef.close(this.data.medication.Times);
  }

  onCheckBoxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = parseInt(checkbox.value, 10);

    console.log(value);
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

  saveWeeklyTimes() {
    this.data.medication.Times.push({
      weekDay: this.weekDays,
      time: this.newTimes,
    });
    this.dialogRef.close(this.data.medication.Times);
  }

  ngOnInit(): void {
    // console.log(this.data.medication.FrequencyType);
    // console.log(this.data.medication.Recurrency);
    // if (this.data.medication.FrequencyType !== 0) {
    //   this.newTimes = new Array(1).fill(null);
    // }
  }
}

// daily: criar um array de times com length = recurrency, iterar sobre esse array pra exibir timepickers,
// chamar função que itera passando cada item desse array para um índice de times

//weekly: criar um array de weekdays (0 a 6), exibir dia da semana para escolher e inserir no array de weekdays,
//criar um array de times com 1 posição, exibir um timepicker e botão + horário, push no array de horários

//monthly/anual: criar um array de datas com length = recurrency, iterar p/ exibir datepickers,
// push no array de datas. criar um array de times, exibir um timepicker e botão + p/ add e push

// no final, passar pro array de times
