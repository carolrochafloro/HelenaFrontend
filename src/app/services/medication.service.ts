import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IMedication } from 'app/interfaces/meds/IMedication';
import { IMedToday } from 'app/interfaces/meds/IMedToday';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  #http = inject(HttpClient);
  #url = '/api';

  #medsList = signal<IMedToday[] | null>(null);
  public getMedsListByDay = this.#medsList.asReadonly();

  public getAllMeds(): Observable<IMedication[]> {
    const endpoint = `${this.#url}/medications`;

    return this.#http.get<IMedication[]>(endpoint);
  }

  public getListbyDate(date: string): Observable<IMedToday[]> {
    const endpoint = `${this.#url}/medications/${date}`;

    return this.#http.get<IMedToday[]>(endpoint);
  }
}
