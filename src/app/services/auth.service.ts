import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'app/interfaces/users/ILogin';
import { IRegister } from 'app/interfaces/users/IRegister';
import { response } from 'express';
import { Observable, tap } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #url = '/api';
  #http = inject(HttpClient);
  #router = inject(Router);

  public register(register: IRegister): Observable<{ token: string }> {
    const endpoint = `${this.#url}/api/AppUser/register`;

    return this.#http.post<{ token: string }>(endpoint, register).pipe(
      tap((response) => {
        this.saveToken(response.token);
      })
    );
  }

  public login(login: ILogin): Observable<{ token: string }> {
    const endpoint = `${this.#url}/api/AppUser/login`;

    return this.#http.post<{ token: string }>(endpoint, login).pipe(
      tap((response) => {
        this.saveToken(response.token);
      })
    );
  }

  private saveToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public logout(): void {
    localStorage.removeItem('jwt');
    this.#router.navigate(['/login']);
  }
}
