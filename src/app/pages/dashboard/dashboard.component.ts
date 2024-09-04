import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DayMedicationChipComponent } from '@components/day-medication-chip/day-medication-chip.component';
import { HeaderComponent } from '@components/header/header.component';
import { IMedByDay } from 'app/interfaces/meds/IMedByDay';
import { IMedDayTime } from 'app/interfaces/meds/IMedDayTime';
import { MedicationService } from 'app/services/medication.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, DayMedicationChipComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  #medService = inject(MedicationService);
  medslist: IMedByDay[] = [];
  medDayTimes = signal<IMedDayTime[] | null>(null);

  private updateMedDayTimes() {
    const dayTimesArray: IMedDayTime[] = [];

    this.medslist.forEach((item) => {
      item.times.forEach((time) => {
        const medDayTime: IMedDayTime = {
          id: item.medicationId,
          timeId: time.id,
          name: item.name,
          dosage: item.dosage,
          notes: item.notes,
          isTaken: time.IsTaken,
          time: time.dateTime.toString(),
        };
        dayTimesArray.push(medDayTime);
      });
    });

    this.medDayTimes.set(dayTimesArray);
  }
  ngOnInit(): void {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    this.#medService.getListbyDate(formattedDate).subscribe({
      next: (data) => {
        data.forEach((item) => {
          this.medslist.push(item);
        });
        this.updateMedDayTimes();
      },
      error: (err) => {
        console.error('Erro ao buscar os dados', err);
      },
      complete: () => {
        console.log('Completo.');
      },
    });
  }
}
