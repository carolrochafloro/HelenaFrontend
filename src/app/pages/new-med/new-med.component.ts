import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { NewTimeDialogComponent } from '@components/new-time-dialog/new-time-dialog.component';
import { IDoctor } from 'app/interfaces/doctors/IDoctor';
import { FrequencyType } from 'app/interfaces/meds/FrequencyType.enum';
import { INewMedication } from 'app/interfaces/meds/INewMedication';
import { MedicationService } from 'app/services/medication.service';
import { DoctorService } from 'app/services/doctor.service';
import { IMedication } from 'app/interfaces/meds/IMedication';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-new-med',
  standalone: true,
  imports: [HeaderComponent, FormsModule, FooterComponent],
  templateUrl: './new-med.component.html',
  styleUrl: './new-med.component.scss',
})
export class NewMedComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  #docService = inject(DoctorService);
  #medService = inject(MedicationService);
  isEditMode = false;
  medicationId?: string | null; // Permitir null ou undefined

  public docsList: IDoctor[] = [];

  ngOnInit(): void {
    this.#docService.getDoctors().subscribe({
      next: (data: IDoctor[]) => {
        this.docsList = data;
      },
      error: (err) => {
        console.error('Erro ao buscar os dados', err);
      },
    });

    this.route.paramMap.subscribe((params) => {
      this.medicationId = params.get('id');
      if (this.medicationId) {
        this.isEditMode = true;
        this.loadMedication();
      }
    });
  }

  newMedication: INewMedication = {
    Name: '',
    Lab: '',
    Type: '',
    Dosage: '',
    Notes: '',
    Start: '',
    End: '',
    Img: '',
    FrequencyType: FrequencyType.dia,
    Recurrency: 0,
    DoctorId: '',
    IndicatedFor: '',
    UserId: '',
    Times: [],
  };

  medication: IMedication = {
    id: '',
    name: '',
    lab: '',
    type: '',
    dosage: '',
    notes: '',
    start: new Date(),
    end: new Date(),
    frequencyType: FrequencyType.dia,
    recurrency: 0,
    doctorId: '',
    doctorName: '',
    doctorSpecialty: '',
    indicatedFor: '',
    times: [],
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
    if (this.isEditMode) {
      this.medication.doctorId = selectElement.value;
    } else {
      this.newMedication.DoctorId = selectElement.value;
    }
  }

  onMedTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (this.isEditMode) {
      this.medication.type = selectElement.value;
    } else {
      this.newMedication.Type = selectElement.value;
    }
  }

  onFrequencyTypeSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (this.isEditMode) {
      this.medication.frequencyType = parseInt(selectElement.value);
    } else {
      this.newMedication.FrequencyType = parseInt(selectElement.value);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewTimeDialogComponent, {
      data: {
        medication: this.isEditMode ? this.medication : this.newMedication,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  loadMedication(): void {
    this.#medService.getMedById(this.medicationId!).subscribe({
      next: (medication) => {
        this.medication = medication;
        if (this.isEditMode) {
          // Preencher o formulário com os dados do medicamento
          this.newMedication = {
            Name: medication.name,
            Lab: medication.lab,
            Type: medication.type,
            Dosage: medication.dosage,
            Notes: medication.notes,
            DoctorId: medication.doctorId,
            IndicatedFor: medication.indicatedFor,
            Img: '',
            Start: '',
            End: '',
            FrequencyType: 0,
            Recurrency: 0,
            UserId: '',
            Times: [],
          };
        }
      },
      error: (err) => {
        console.error('Erro ao carregar medicamento', err);
      },
    });
  }

  submitMedication() {
    console.log(this.newMedication);

    if (this.isEditMode) {
      this.medication = {
        id: this.medication.id,
        name: this.newMedication.Name,
        lab: this.newMedication.Lab,
        type: this.newMedication.Type,
        dosage: this.newMedication.Dosage,
        notes: this.newMedication.Notes,
        start: this.medication.start,
        end: this.medication.end,
        frequencyType: this.medication.frequencyType,
        recurrency: this.medication.recurrency,
        doctorId: this.newMedication.DoctorId,
        doctorName: this.medication.doctorName,
        doctorSpecialty: this.medication.doctorSpecialty,
        indicatedFor: this.newMedication.IndicatedFor,
        times: this.medication.times,
      };
      this.#medService.updateMed(this.medication).subscribe({
        next: () => {
          this.router.navigate(['/meds']);
        },
        error: (err) => {
          console.error('Não foi possível atualizar o remédio', err);
          alert('Não foi possível atualizar o medicamento.');
          this.router.navigate(['/new-med']);
        },
      });
    } else {
      this.#medService.newMedication(this.newMedication).subscribe({
        next: () => {
          this.router.navigate(['/meds']);
        },
        error: (err) => {
          console.error('Não foi possível cadastrar o remédio', err);
          alert('Não foi possível cadastrar o medicamento.');
          this.router.navigate(['/new-med']);
        },
      });
    }
  }
}
