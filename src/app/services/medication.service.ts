import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal, Type } from '@angular/core';
import { IDoctor } from 'app/interfaces/doctors/IDoctor';
import { INewDoctor } from 'app/interfaces/doctors/INewDoctor';
import { IMedByDay } from 'app/interfaces/meds/IMedByDay';
import { IMedication } from 'app/interfaces/meds/IMedication';
import { INewMedication } from 'app/interfaces/meds/INewMedication';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AppUserService } from './app-user.service';

@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  #http = inject(HttpClient);
  #url = '/api';
  #authService = inject(AuthService);
  #userService = inject(AppUserService);

  #medsList = signal<IMedByDay[] | null>(null);
  public getMedsListByDay = this.#medsList.asReadonly();

  public getAllMeds(): Observable<IMedication[]> {
    const userId = this.#userService.getUserId();
    const endpoint = `${this.#url}/api/Medication/get/all/${userId}`;
    const token = this.#authService.getToken();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.#http.get<IMedication[]>(endpoint, { headers });
  }

  public getListbyDate(date: string): Observable<IMedByDay[]> {
    const endpoint = `${this.#url}/api/Medication/get/date`;
    const token = this.#authService.getToken();
    const userId = this.#userService.getUserId();

    const body = {
      date: date,
      userId: userId,
    };

    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.#http.post<IMedByDay[]>(endpoint, body, { headers });
  }

  public newMedication(med: INewMedication): Observable<INewMedication> {
    const endpoint = `${this.#url}/api/Medication`;
    const token = this.#authService.getToken();
    const userId = this.#userService.getUserId();

    med.UserId = userId;

    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.#http.post<INewMedication>(endpoint, med, { headers });
  }

  public getMedById(id: string): Observable<IMedication> {
    const endpoint = `${this.#url}/medications/byid/${id}`;

    return this.#http.get<IMedication>(endpoint);
  }
}
