import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { MedicationService } from 'app/services/medication.service';

@Component({
  selector: 'app-new-doctor',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './new-doctor.component.html',
  styleUrl: './new-doctor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewDoctorComponent implements OnInit {
  constructor() {}

  #docService = inject(MedicationService);

  ngOnInit(): void {}
}
