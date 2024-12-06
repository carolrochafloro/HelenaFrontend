import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ILogin } from 'app/interfaces/users/ILogin';
import { IRegister } from 'app/interfaces/users/IRegister';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginData: ILogin = { email: '', password: '' };
  registerData: IRegister = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
  };
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onLogin() {
    // validar
    // redirecionar p/ dashboard
  }

  onRegister() {
    // redirecionar p/ página própria
  }
}
