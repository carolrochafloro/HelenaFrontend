import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppUserService } from 'app/services/app-user.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isMenuVisible = false;

  #userService = inject(AppUserService);

  userName = this.#userService.getUserName();

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
