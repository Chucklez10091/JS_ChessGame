import { player } from "../models/player";
import { piece } from "../models/piece";

class game {
    constructor(player1Name = 'White', player2Name = 'Black') {
        this.player1 = new player('White', player1Name);
        this.player2 = new player('Black', player2Name);
    }
    
    start() {
        console.log(`${this.player1.name} vs ${this.player2.name} - Let the game begin!`);
    }
    
    promotePawn(){

    }
}