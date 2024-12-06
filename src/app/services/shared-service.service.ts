import { Injectable } from '@angular/core';
import { IMedication } from 'app/interfaces/meds/IMedication';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private medication: IMedication | null = null;

  setMedication(med: IMedication) {
    this.medication = med;
  }

  getMedication(): IMedication | null {
    return this.medication;
  }
}
