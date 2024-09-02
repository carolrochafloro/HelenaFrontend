import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from '@components/header/header.component';
import { IDoctor } from 'app/interfaces/doctors/IDoctor';
import { MedicationService } from 'app/services/medication.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [HeaderComponent, MatDialogModule, MatTableModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorsComponent implements OnInit {
  displayedColumns: string[] = ['Nome', 'Especialidade'];

  #medService = inject(MedicationService);
  public docsList: IDoctor[] = [];

  ngOnInit(): void {
    this.#medService.getDoctors().subscribe({
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
}
