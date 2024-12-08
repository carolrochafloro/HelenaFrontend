import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRegister } from 'app/interfaces/users/IRegister';

@Injectable({
  providedIn: 'root',
})
export class AppUserService {
  #http = inject(HttpClient);
  #url = '/api';
}
