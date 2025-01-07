import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IApiResponse } from 'app/interfaces/IApiResponse';
import { ILogin } from 'app/interfaces/users/ILogin';
import { IRegister } from 'app/interfaces/users/IRegister';
import { response } from 'express';
import { Observable, tap } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #url = 'https://helenabackend.onrender.com';
  #http = inject(HttpClient);
  #router = inject(Router);

  public register(register: IRegister): Observable<IApiResponse> {
    const endpoint = `${this.#url}/api/AppUser/register`;

    return this.#http.post<IApiResponse>(endpoint, register).pipe(
      tap((response) => {
        this.saveToken(response.message);
      })
    );
  }

  public login(login: ILogin): Observable<IApiResponse> {
    const endpoint = `${this.#url}/api/AppUser/login`;

    return this.#http.post<IApiResponse>(endpoint, login).pipe(
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
