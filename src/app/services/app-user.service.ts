import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IJwtPayload } from 'app/interfaces/users/IJwtPayload';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AppUserService {
  #http = inject(HttpClient);
  #url = '/api';

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
}
