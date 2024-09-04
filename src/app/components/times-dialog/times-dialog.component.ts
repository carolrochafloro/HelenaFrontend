import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-times-dialog',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './times-dialog.component.html',
  styleUrl: './times-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TimesDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { times: { date: string; times: any[] }[] }
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
