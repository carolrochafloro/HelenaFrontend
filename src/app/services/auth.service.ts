import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IApiResponse } from 'app/interfaces/IApiResponse';
import { ILogin } from 'app/interfaces/users/ILogin';
import { IRegister } from 'app/interfaces/users/IRegister';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #apiUrl = environment.apiUrl;
  #http = inject(HttpClient);
  #router = inject(Router);

  public register(register: IRegister): Observable<IApiResponse> {
    const endpoint = `${this.#apiUrl}/api/AppUser/register`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.#http.post<IApiResponse>(endpoint, register, { headers }).pipe(
      tap((response) => {
        this.saveToken(response.message);
      })
    );
  }

  public login(login: ILogin): Observable<IApiResponse> {
    const endpoint = `${this.#apiUrl}/api/AppUser/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.#http.post<IApiResponse>(endpoint, login, { headers }).pipe(
      tap((response) => {
        this.saveToken(response.message);
      })
    );
  }

  private saveToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  public getToken(): string | null {
    const token = localStorage.getItem('jwt');
    return token;
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public logout(): void {
    localStorage.removeItem('jwt');
    this.#router.navigate(['/login']);
  }
}
