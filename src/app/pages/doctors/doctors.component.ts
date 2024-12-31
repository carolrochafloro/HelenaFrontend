import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { IDoctor } from 'app/interfaces/doctors/IDoctor';
import { DoctorService } from 'app/services/doctor.service';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [
    HeaderComponent,
    MatDialogModule,
    MatTableModule,
    RouterLink,
    FooterComponent,
  ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DoctorsComponent implements OnInit {
  displayedColumns: string[] = ['Nome', 'Especialidade', 'Contato'];

  #docService = inject(DoctorService);
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
  }
}
