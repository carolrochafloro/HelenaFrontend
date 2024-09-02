import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '@components/header/header.component';
import { IDoctor } from 'app/interfaces/doctors/IDoctor';
import { FrequencyType } from 'app/interfaces/meds/FrequencyType.enum';
import { INewMedication } from 'app/interfaces/meds/INewMedication';
import { MedicationService } from 'app/services/medication.service';
import { log } from 'console';

@Component({
  selector: 'app-new-med',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './new-med.component.html',
  styleUrl: './new-med.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMedComponent implements OnInit {
  #docService = inject(MedicationService);
  public docsList: IDoctor[] = [];

  ngOnInit(): void {
    this.#docService.getDoctors().subscribe({
      next: (data: IDoctor[]) => {
        data.forEach((doctor) => {
          this.docsList.push(doctor);
        });
      },
      error: (err) => {
        console.error('Erro ao buscar os dados', err);
      },
      complete: () => {
        console.log('Lista de médicos obtida.');
      },
    });
  }

  newMedication: INewMedication = {
    Name: '',
    Lab: '',
    Type: '',
    Dosage: '',
    Notes: '',
    Img: '',
    Start: '',
    End: '',
    FrequencyType: 0,
    Recurrency: 0,
    DoctorId: '',
    IndicatedFor: '',
  };

  medTypes = [
    'Comprimido',
    'Gotas',
    'Injeção',
    'Jatos',
    'Cápsulas',
    'Colírio',
    'Supositório',
    'Adesivo',
    'Pastilha',
    'Creme/pomada',
  ];

  frequencyOptions = Object.keys(FrequencyType)
    .filter((key) => isNaN(Number(key)))
    .map((key) => {
      return {
        label: key,
        value: FrequencyType[key as keyof typeof FrequencyType],
      };
    });

  frequencyType = FrequencyType;

  onDoctorChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.newMedication.DoctorId = selectElement.value;
  }

  onMedTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.newMedication.Type = selectElement.value;
  }

  onFrequencyTypeSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.newMedication.FrequencyType = parseInt(selectElement.value);
  }

  submitMedication() {
    this.#docService.newMedication(this.newMedication).subscribe({
      next: (response) => {
        console.log('Remédio criado', response);
      },
      error: (err) => {
        console.error('Não foi possível criar o remédio', err);
      },
    });
  }
}
