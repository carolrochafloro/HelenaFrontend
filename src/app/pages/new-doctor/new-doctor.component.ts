import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from 'app/services/doctor.service';
import { INewDoctor } from 'app/interfaces/doctors/INewDoctor';
import { AppUserService } from 'app/services/app-user.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-doctor',
  standalone: true,
  imports: [HeaderComponent, FormsModule, FooterComponent],
  templateUrl: './new-doctor.component.html',
  styleUrl: './new-doctor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewDoctorComponent implements OnInit {
  constructor(private snackBar: MatSnackBar) {}

  #docService = inject(DoctorService);
  #router = inject(Router);
  #userService = inject(AppUserService);

  newUserId = this.#userService.getUserId();

  doctorData: INewDoctor = {
    name: '',
    specialty: '',
    contact: '',
    userId: this.newUserId,
  };

  onSubmit() {
    this.#docService.newDoctor(this.doctorData).subscribe({
      next: () => {
        this.snackBar.open('Médico cadastrado!', 'Fechar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        this.#router.navigate(['/doctors']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // mantendo para depois usar a página para editar médicos
  ngOnInit(): void {}
}
