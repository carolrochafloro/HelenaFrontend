import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ILogin } from 'app/interfaces/users/ILogin';
import { IRegister } from 'app/interfaces/users/IRegister';
import { AuthService } from 'app/services/auth.service';
import { response } from 'express';

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

  #authService = inject(AuthService);
  #router = inject(Router);

  ngOnInit(): void {}
  onLogin() {
    this.#authService.login(this.loginData).subscribe({
      next: (response) => {
        this.#router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err);
        alert('Falha ao realizar o login. Tente novamente!');
      },
    });
  }

  onRegister() {
    this.#authService.register(this.registerData).subscribe({
      next: (response) => {
        this.#router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err);

        alert('Falha ao cadastrar. Tente novamente!');
      },
    });
  }
}
