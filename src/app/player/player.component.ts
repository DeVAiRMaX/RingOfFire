import { Component, Input, input } from '@angular/core';
import { Game } from '../models/game';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Input() name!: string;
  @Input() playerActive: boolean = false;

}
