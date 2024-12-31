import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { AppUserService } from 'app/services/app-user.service';
import { AuthService } from 'app/services/auth.service';
import { IRegister } from 'app/interfaces/users/IRegister';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FormsModule, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
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
        error: (error) => {
          console.error('Erro ao obter os dados do usuário:', error);
        },
      });
    }
  }

  saveUser(): void {
    if (this.userId) {
      this.#userService.updateUser(this.userId, this.user).subscribe(
        () => {
          console.log('Usuário atualizado com sucesso!');
          alert('Perfil atualizado com sucesso!');
        },
        (error) => {
          console.error('Erro ao atualizar o usuário:', error);
          alert('Erro ao atualizar perfil.');
        }
      );
    }
  }
}
