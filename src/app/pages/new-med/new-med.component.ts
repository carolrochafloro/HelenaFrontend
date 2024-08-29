import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';

@Component({
  selector: 'app-new-med',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './new-med.component.html',
  styleUrl: './new-med.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMedComponent {}
