import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DayMedicationChipComponent } from '@components/day-medication-chip/day-medication-chip.component';
import { HeaderComponent } from '@components/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, DayMedicationChipComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
