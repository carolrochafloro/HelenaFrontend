import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { DayMedicationChipComponent } from '@components/day-medication-chip/day-medication-chip.component';
import { HeaderComponent } from '@components/header/header.component';
import { IMedToday } from 'app/interfaces/meds/IMedToday';
import { MedicationService } from 'app/services/medication.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, DayMedicationChipComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  #medService = inject(MedicationService);
  medslist: IMedToday[] | null = null;

  ngOnInit(): void {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    this.#medService.getListbyDate(formattedDate).subscribe({
      next: (data) => {
        this.medslist = data;
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
