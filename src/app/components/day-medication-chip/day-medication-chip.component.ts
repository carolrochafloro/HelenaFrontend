import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IMedToday } from 'app/interfaces/meds/IMedToday';

@Component({
  selector: 'app-day-medication-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-medication-chip.component.html',
  styleUrl: './day-medication-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DayMedicationChipComponent {
  @Input() med!: IMedToday;
}
