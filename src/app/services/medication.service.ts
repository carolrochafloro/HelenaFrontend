import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IMedToday } from 'app/interfaces/meds/IMedToday';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  #http = inject(HttpClient);
  #url = 'http://localhost:7135';

  #medsList = signal<IMedToday[] | null>(null);
  public getMedsListByDay = this.#medsList.asReadonly();

  public getListbyDate(date: string): Observable<IMedToday[]> {
    const endpoint = `${this.#url}/medications/${date}`;

    return this.#http.get<IMedToday[]>(endpoint);
  }
}
