import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
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

  public getListbyDate(date: string): Observable<IMedToday[]> {
    const endpoint = `${this.#url}/medications/${date}`;
    // const headers = new HttpHeaders({
    //   'content-type': 'application/json',
    //   Accept: 'application/json',
    // });

    return this.#http.get<IMedToday[]>(endpoint);
  }
}
