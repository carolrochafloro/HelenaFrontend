import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal, Type } from '@angular/core';
import { IDoctor } from 'app/interfaces/doctors/IDoctor';
import { IMedByDay } from 'app/interfaces/meds/IMedByDay';
import { IMedication } from 'app/interfaces/meds/IMedication';
import { INewMedication } from 'app/interfaces/meds/INewMedication';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  #http = inject(HttpClient);
  #url = '/api';

  #medsList = signal<IMedByDay[] | null>(null);
  public getMedsListByDay = this.#medsList.asReadonly();

  public getAllMeds(): Observable<IMedication[]> {
    const endpoint = `${this.#url}/medications`;

    return this.#http.get<IMedication[]>(endpoint);
  }

  public getListbyDate(date: string): Observable<IMedByDay[]> {
    const endpoint = `${this.#url}/medications/${date}`;

    return this.#http.get<IMedByDay[]>(endpoint);
  }

  public getDoctors(): Observable<IDoctor[]> {
    const endpoint = `${this.#url}/doctors`;
    return this.#http.get<IDoctor[]>(endpoint);
  }

  public newMedication(med: INewMedication): Observable<INewMedication> {
    const endpoint = `${this.#url}/medications`;
    return this.#http.post<INewMedication>(endpoint, med, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public newDoctor(doc: IDoctor): Observable<IDoctor> {
    const endpoint = `${this.#url}/doctors`;
    return this.#http.post<IDoctor>(endpoint, doc, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
