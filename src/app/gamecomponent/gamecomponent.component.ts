import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from '../models/game';
import { PlayerComponent } from '../player/player.component';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MaterialModule } from '../../modules/material.module';
import { MatDialog } from '@angular/material/dialog';
import { GameInfoComponent } from "../game-info/game-info.component";
import { Firestore, collection, onSnapshot, setDoc, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-gamecomponent',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MaterialModule, GameInfoComponent],
  templateUrl: './gamecomponent.component.html',
  styleUrl: './gamecomponent.component.scss'
})
export class GamecomponentComponent {

  game: Game = new Game();

  firestore: Firestore = inject(Firestore);

  unsubGame: any;

  gameId: string = '';

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.newGame();

    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      this.unsubGame = onSnapshot(this.getSingelDocRef(), (game: any) => {
        if (game.exists()) {
          const currentGame = game.data()
          console.log('Gameinfo:', currentGame);
          this.game.cards = currentGame.cards;
          this.game.currentPlayer = currentGame.currentPlayer;
          this.game.deck = currentGame.deck;
          this.game.players = currentGame.players;
          this.game.pickupCardanimation = currentGame.pickupCardanimation;
          this.game.currentCard = currentGame.currentCard;
        } else {
          console.log('Game does not exist');
        }
      });
    });
  }

  getSingelDocRef() {
    return doc(collection(this.firestore, 'games'), this.gameId)
  }

  async updateGame() {
    try {
      await updateDoc(this.getSingelDocRef(), this.game.toJson());
      console.log("Game erfolgreich aktualisiert:");
    } catch (error) {
      console.error("Fehler beim Speichern in Firestore:", error);
    }
  }

  getGameData() {
    return collection(this.firestore, 'games')
  }

  ngondestroy(): void {
    this.unsubGame();
  }

  async newGame() {
      this.game = new Game();
  }

  takeCard() {
    if (!this.game.pickupCardanimation) {
      this.game.currentCard = this.game.deck.pop();
      this.game.pickupCardanimation = true;
      this.game.currentPlayer++;
      if (this.game.currentPlayer >= this.game.players.length) {
        this.game.currentPlayer = 0;
      }
      this.updateGame();

      setTimeout(() => {
        this.game.cards.push(this.game.currentCard);
        this.game.pickupCardanimation = false;
        this.updateGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.updateGame();
      }
    });
  }
}

