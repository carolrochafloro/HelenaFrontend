import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { IMedication } from 'app/interfaces/meds/IMedication';
import { HeaderComponent } from '../../components/header/header.component';
import { ITimes } from 'app/interfaces/meds/ITimes';
import { MedicationService } from 'app/services/medication.service';

import { FrequencyType } from 'app/interfaces/meds/FrequencyType.enum';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-med-details',
  standalone: true,
  imports: [HeaderComponent, DatePipe],
  templateUrl: './med-details.component.html',
  styleUrl: './med-details.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MedDetailsComponent implements OnInit {
  med!: IMedication;

  constructor(private route: ActivatedRoute) {}

  #medService = inject(MedicationService);

  ngOnInit(): void {
    const medicationId = this.route.snapshot.paramMap.get('medicationId');
    if (medicationId) {
      this.getMedicationById(medicationId);
    }
    this.groupByDate();
  }

  private getMedicationById(id: string): void {
    this.#medService.getMedById(id).subscribe((medication) => {
      this.med = medication;
    });
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

  public getFrequencyTypeLabel(type: FrequencyType): string {
    return FrequencyType[type];
  }
}
