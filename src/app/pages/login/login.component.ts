import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ILogin } from 'app/interfaces/users/ILogin';
import { IRegister } from 'app/interfaces/users/IRegister';
import { AuthService } from 'app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private snackBar: MatSnackBar) {}

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
        if (response.status) {
          this.#router.navigate(['/dashboard']);
        } else {
          this.snackBar.open(response.message, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Erro', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  onRegister() {
    this.#authService.register(this.registerData).subscribe({
      next: (response) => {
        if (response.status) {
          this.#router.navigate(['/dashboard']);
        } else {
          this.snackBar.open(response.message, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
