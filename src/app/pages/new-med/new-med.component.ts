import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '@components/header/header.component';
import { NewTimeDialogComponent } from '@components/new-time-dialog/new-time-dialog.component';
import { IDoctor } from 'app/interfaces/doctors/IDoctor';
import { FrequencyType } from 'app/interfaces/meds/FrequencyType.enum';
import { INewMedication } from 'app/interfaces/meds/INewMedication';

import { MedicationService } from 'app/services/medication.service';
import { Router } from '@angular/router';
import { DoctorService } from 'app/services/doctor.service';

@Component({
  selector: 'app-new-med',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './new-med.component.html',
  styleUrl: './new-med.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMedComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router) {}

  #docService = inject(DoctorService);
  #medService = inject(MedicationService);
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
    FrequencyType: 6,
    Recurrency: 0,
    DoctorId: '',
    IndicatedFor: '',
    Times: [],
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

  openDialog(): void {
    const dialogRef = this.dialog.open(NewTimeDialogComponent, {
      data: { medication: this.newMedication },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  submitMedication() {
    this.#medService.newMedication(this.newMedication).subscribe({
      next: (response) => {
        this.router.navigate(['/meds']);
      },
      error: (err) => {
        console.error('Não foi possível criar o remédio', err);
      },
    });
  }
}
