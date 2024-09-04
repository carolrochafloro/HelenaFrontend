import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimesDialogComponent } from '@components/times-dialog/times-dialog.component';
import { FrequencyType } from 'app/interfaces/meds/FrequencyType.enum';
import { IMedDayTime } from 'app/interfaces/meds/IMedDayTime';
import { IMedication } from 'app/interfaces/meds/IMedication';
import { ITimes } from 'app/interfaces/meds/ITimes';

@Component({
  selector: 'app-med-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './med-list.component.html',
  styleUrl: './med-list.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedListComponent implements OnInit {
  @Input() med!: IMedication;

  constructor(public dialog: MatDialog) {}
  FrequencyType = FrequencyType;

  ngOnInit(): void {
    this.groupByDate();
  }

  medTimes: ITimes[] = [];
  groupedTimes: { date: string; times: ITimes[] }[] = [];

  public groupByDate() {
    const grouped = new Map<string, ITimes[]>();

    this.med.times.forEach((item) => {
      const date = item.dateTime.split('T')[0];

      if (!grouped.has(date)) {
        grouped.set(date, []);
      }
      grouped.get(date)?.push(item);
    });

    this.groupedTimes = Array.from(grouped, ([date, times]) => ({
      date,
      times,
    }));
  }

  public isActive(start: Date, end: Date): boolean {
    var today = new Date();
    var start = new Date(this.med.start);
    var end = new Date(this.med.end);

    return (
      start.getTime() <= today.getTime() && end.getTime() >= today.getTime()
    );
  }

  public formatDate(dateString: string): string {
    const date = new Date(dateString);

    return isNaN(date.getTime())
      ? 'Data inválida'
      : date.toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(TimesDialogComponent, {
      width: '30vw',
      height: '500px',
      data: { times: this.groupedTimes },
      disableClose: false,
    });
  }
}
