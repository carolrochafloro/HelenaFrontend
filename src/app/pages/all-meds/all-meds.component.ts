import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { MedListComponent } from '@components/med-list/med-list.component';
import { IMedication } from 'app/interfaces/meds/IMedication';
import { MedicationService } from 'app/services/medication.service';

@Component({
  selector: 'app-all-meds',
  standalone: true,
  imports: [HeaderComponent, MedListComponent, RouterLink],
  templateUrl: './all-meds.component.html',
  styleUrl: './all-meds.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllMedsComponent implements OnInit {
  #medService = inject(MedicationService);
  medslist = signal<IMedication[] | null>(null);

  ngOnInit(): void {
    this.#medService.getAllMeds().subscribe({
      next: (data) => {
        this.medslist.set(data);
      },
      error: (err) => {
        console.error('Erro ao buscar os dados', err);
      },
      complete: () => {
        console.log('Complete.');
      },
    });
  }
}
