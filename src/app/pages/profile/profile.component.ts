import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { AppUserService } from 'app/services/app-user.service';
import { IRegister } from 'app/interfaces/users/IRegister';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FormsModule, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  #userService = inject(AppUserService);

  userId: string | null = '';

  user: IRegister = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
  };

  ngOnInit(): void {
    this.userId = this.#userService.getUserId();

    if (this.userId) {
      this.#userService.getUser(this.userId).subscribe({
        next: (userData) => {
          this.user = userData;
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open(
            'Erro ao buscar o usuário. Tente novamente mais tarde.',
            'Fechar',
            {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            }
          );
        },
      });
    }
  }

  saveUser(): void {
    if (this.userId) {
      this.#userService.updateUser(this.userId, this.user).subscribe({
        next: (response) => {
          if (response.status) {
            this.snackBar.open(response.message, 'Fechar', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
            window.location.reload();
          } else {
            this.snackBar.open(response.message, 'Fechar', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          }
        },
        error: (err) => {
          this.snackBar.open(
            'Erro ao atualizar os dados. Tente novamente mais tarde.',
            'Fechar',
            {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            }
          );
          console.error(err);
        },
      });
    }
  }

  deleteUser(): void {
    if (this.userId) {
      const confirmed = confirm(
        'Deseja deletar o seu perfil? Esse processo é irreversível e todos os dados serão perdidos.'
      );

      if (confirmed) {
        this.#userService.deleteUser(this.userId).subscribe({
          next: (response) => {
            if (response.status) {
              this.snackBar.open(response.message, 'Fechar', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
              this.router.navigate(['/']);
            } else {
              this.snackBar.open(response.message, 'Fechar', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
            }
          },
          error: (error) => {
            this.snackBar.open(
              'Erro ao deletar o perfil. Tente novamente mais tarde.',
              'Fechar',
              {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              }
            );
            console.error(error);
          },
        });
      }
    }
  }
}
