import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INewDoctor } from 'app/interfaces/doctors/INewDoctor';
import { IDoctor } from 'app/interfaces/doctors/IDoctor';
import { AuthService } from './auth.service';
import { AppUserService } from './app-user.service';
import { IApiResponse } from 'app/interfaces/IApiResponse';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  #url = 'https://helenabackend.onrender.com';
  #http = inject(HttpClient);
  #authService = inject(AuthService);
  #userService = inject(AppUserService);

  public newDoctor(doc: INewDoctor): Observable<IDoctor> {
    const endpoint = `${this.#url}/api/Doctor/create`;
    const token = this.#authService.getToken();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.#http.post<IDoctor>(endpoint, doc, { headers });
  }

  public getDoctors(): Observable<IDoctor[]> {
    const endpoint = `${this.#url}/api/Doctor/get`;
    const token = this.#authService.getToken();
    const userId = this.#userService.getUserId();

    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.#http.post<IDoctor[]>(endpoint, { userId }, { headers });
  }

  public deleteDoctor(doctorId: string): Observable<IApiResponse> {
    const endpoint = `${this.#url}/api/Doctor/delete/${doctorId}`;
    const token = this.#authService.getToken();

    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.#http.delete<IApiResponse>(endpoint, { headers });
  }
}
