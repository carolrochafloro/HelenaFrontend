import { DatePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

import { FrequencyType } from 'app/interfaces/meds/FrequencyType.enum';
import { IMedication } from 'app/interfaces/meds/IMedication';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from 'app/services/shared-service.service';

@Component({
  selector: 'app-med-list',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './med-list.component.html',
  styleUrl: './med-list.component.scss',
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
