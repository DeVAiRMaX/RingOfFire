export class Game {
    public players:string[] = [];
    public deck:string[] = [];
    public cards:string[] = [];
    public currentPlayer:number = 0;

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.deck.push(`clubs_` + i);
            this.deck.push(`ace_` + i);
            this.deck.push(`hearts_` + i);
            this.deck.push(`diamonds_` + i);
        }

        shuffle(this.deck);
    }
}

export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
};