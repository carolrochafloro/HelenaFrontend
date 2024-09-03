import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal, Type } from '@angular/core';
import { IDoctor } from 'app/interfaces/doctors/IDoctor';
<<<<<<< HEAD
import { IMedByDay } from 'app/interfaces/meds/IMedByDay';
import { IMedication } from 'app/interfaces/meds/IMedication';
=======
import { IMedication } from 'app/interfaces/meds/IMedication';
import { IMedToday } from 'app/interfaces/meds/IMedToday';
>>>>>>> a3c8a04e633a1b163c6b6da7f1959c26889cae8f
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
}
