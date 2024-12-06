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
import { SharedService } from 'app/services/shared-service.service';
import { FrequencyType } from 'app/interfaces/meds/FrequencyType.enum';

@Component({
  selector: 'app-med-details',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './med-details.component.html',
  styleUrl: './med-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedDetailsComponent implements OnInit {
  med!: IMedication;

  #medService = inject(MedicationService);

  // receber id do medicamento via rota e usar um getbyid puxando da API

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
