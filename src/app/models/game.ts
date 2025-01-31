export class Game {
    public players: string[] = [];
    public deck: string[] = [];
    public cards: string[] = [];
    public currentPlayer: number = 0;
    public pickupCardanimation = false;
    public currentCard: any = '';

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.deck.push(`clubs_` + i);
            this.deck.push(`ace_` + i);
            this.deck.push(`hearts_` + i);
            this.deck.push(`diamonds_` + i);
        }

        shuffle(this.deck);
    }

    public toJson() {
        return {
            players: this.players,
            deck: this.deck,
            cards: this.cards,
            currentPlayer: this.currentPlayer,
            pickupCardanimation: this.pickupCardanimation,
            currentCard: this.currentCard
        }
    }
}



export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
};