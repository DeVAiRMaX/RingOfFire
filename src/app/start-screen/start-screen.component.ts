import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  // firestore: Firestore = inject(Firestore);

  constructor(private router: Router, private firestore: Firestore) { }

  startGame() {
      let game = new Game();
      addDoc(collection(this.firestore, 'games'), game.toJson()).then((gameData: any) => {
        this.router.navigate(['app-gamecomponent/' + gameData.id]);
      }
      );
  }
}
