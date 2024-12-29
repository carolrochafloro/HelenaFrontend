import { DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { FrequencyType } from 'app/interfaces/meds/FrequencyType.enum';
import { IMedication } from 'app/interfaces/meds/IMedication';
import { Router } from '@angular/router';
import { MedicationService } from 'app/services/medication.service';

@Component({
  selector: 'app-med-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './med-list.component.html',
  styleUrl: './med-list.component.scss',
})
export class MedListComponent {
  @Input() med!: IMedication;
  @Output() medicationDeleted = new EventEmitter<string>();
  #medService = inject(MedicationService);

  constructor(private router: Router) {}

  FrequencyType = FrequencyType;

  public goToDetails(): void {
    this.router.navigate(['/details', this.med.id]);
  }

  public isActive(start: Date, end: Date): boolean {
    var today = new Date();
    var start = new Date(this.med.start);
    var end = new Date(this.med.end);

    return (
      start.getTime() <= today.getTime() && end.getTime() >= today.getTime()
    );
  }

  public deleteMed(): void {
    const confirmed = confirm(
      'Tem certeza que deseja excluir este medicamento?'
    );
    if (confirmed) {
      this.#medService.deleteMed(this.med.id).subscribe({
        next: () => {
          console.log('Medicamento excluído com sucesso!');
          this.medicationDeleted.emit(this.med.id);
        },
        error: (err) => {
          alert('Erro ao excluir medicamento!');
          console.error(err);
        },
      });
    }
  }

  public editMed(): void {
    this.router.navigate(['/meds/edit', this.med.id]);
  }
}
