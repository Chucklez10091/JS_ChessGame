import player from "../models/player.js";
//import { piece } from "../models/piece.js";

export default class game {
    player1; player2;

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

