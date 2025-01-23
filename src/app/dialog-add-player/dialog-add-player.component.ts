import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../modules/material.module';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name: string = '';

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }

  onNoClick() {
    this.dialogRef.close();
  }

}
