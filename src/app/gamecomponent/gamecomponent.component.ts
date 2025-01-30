import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from '../models/game';
import { PlayerComponent } from '../player/player.component';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MaterialModule } from '../../modules/material.module';
import { MatDialog } from '@angular/material/dialog';
import { GameInfoComponent } from "../game-info/game-info.component";
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-gamecomponent',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MaterialModule, GameInfoComponent],
  templateUrl: './gamecomponent.component.html',
  styleUrl: './gamecomponent.component.scss'
})
export class GamecomponentComponent {
  pickupCardanimation = false;
  game: Game = new Game();
  currentCard: any;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.newGame();
    this
      .firestore
      .collection('games')
      .valueChanges()
      .subscribe((game) => {
        console.log(game);
      });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickupCardanimation) {
      this.currentCard = this.game.deck.pop();
      this.pickupCardanimation = true;

      setTimeout(() => {
        this.game.cards.push(this.currentCard);
        this.pickupCardanimation = false;
        this.game.currentPlayer++;
        if (this.game.currentPlayer >= this.game.players.length) {
          this.game.currentPlayer = 0;
        }
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}

