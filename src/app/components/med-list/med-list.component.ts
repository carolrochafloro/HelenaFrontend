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

  public isActive(start: Date, end: Date): boolean {
    var today = new Date();
    var start = new Date(this.med.start);
    var end = new Date(this.med.end);

    return (
      start.getTime() <= today.getTime() && end.getTime() >= today.getTime()
    );
  }
}
