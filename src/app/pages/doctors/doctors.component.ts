import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { IDoctor } from 'app/interfaces/doctors/IDoctor';
import { DoctorService } from 'app/services/doctor.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
})
export class DoctorsComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  displayedColumns: string[] = ['Nome', 'Especialidade', 'Contato', 'Excluir'];

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

  public deleteDoctor(doctorId: string) {
    var confirmed = confirm(
      'Deseja deletar o cadastro do médico? Essa ação é irreversível.'
    );

    if (confirmed) {
      this.#docService.deleteDoctor(doctorId).subscribe({
        next: (response) => {
          window.location.reload();
          this.snackBar.open(response.message, 'Fechar', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        },
        error: (err) => {
          this.snackBar.open(
            'Erro ao deletar o cadastro do médico. Tente novamente mais tarde.',
            'Fechar',
            {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            }
          );
        },
      });
    }
  }
}
