import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IJwtPayload } from 'app/interfaces/users/IJwtPayload';
import { IRegister } from 'app/interfaces/users/IRegister';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppUserService {
  #http = inject(HttpClient);
  #url = '/api';
  #authService = inject(AuthService);

  getUserName(): string | null {
    const token = localStorage.getItem('jwt');

    if (token) {
      try {
        const decoded = jwtDecode<IJwtPayload>(token);

        const userName = decoded.name;
        return userName;
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
      }
    } else {
      return null;
    }
  }

  getUserId(): string | null {
    const token = localStorage.getItem('jwt');

    if (token) {
      try {
        const decoded = jwtDecode<IJwtPayload>(token);

        const userId = decoded.sub;

        return userId;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    return null;
  }

  getUser(userId: string): Observable<IRegister> {
    const endpoint = `${this.#url}/api/User/${userId}`;
    const token = this.#authService.getToken();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.#http.get<IRegister>(endpoint, { headers });
  }

  updateUser(userId: string, user: IRegister): Observable<void> {
    const endpoint = `${this.#url}/api/User/${userId}`;
    const token = this.#authService.getToken();

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.#http.put<void>(endpoint, user, { headers });
  }
}
