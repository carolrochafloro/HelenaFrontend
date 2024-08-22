import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FrequencyType } from 'app/interfaces/meds/FrequencyType.enum';
import { IMedication } from 'app/interfaces/meds/IMedication';

@Component({
  selector: 'app-med-list',
  standalone: true,
  imports: [],
  templateUrl: './med-list.component.html',
  styleUrl: './med-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedListComponent {
  @Input() med!: IMedication;

  FrequencyType = FrequencyType;
}
