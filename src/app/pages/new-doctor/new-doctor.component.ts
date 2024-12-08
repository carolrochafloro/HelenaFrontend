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

@Component({
  selector: 'app-new-doctor',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './new-doctor.component.html',
  styleUrl: './new-doctor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewDoctorComponent implements OnInit {
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
        this.#router.navigate(['/doctors']);
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao cadastrar médico. Tente novamente!');
      },
    });
  }

  ngOnInit(): void {}
}
