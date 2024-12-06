import { DatePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

import { FrequencyType } from 'app/interfaces/meds/FrequencyType.enum';
import { IMedication } from 'app/interfaces/meds/IMedication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-med-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './med-list.component.html',
  styleUrl: './med-list.component.scss',
})
export class MedListComponent {
  @Input() med!: IMedication;

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
}
