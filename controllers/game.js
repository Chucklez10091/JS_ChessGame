import player from "../models/player.js";
//import { piece } from "../models/piece.js";

export default class game {
    player1; player2;
    selectedpiece;
    currentPlayer;
    board = {};
    moveOptions = [];

    constructor(player1Name = 'White', player2Name = 'Black') {
        for (let col = 'a'; col <= 'h'; col = String.fromCharCode(col.charCodeAt(0) + 1)) {
            // Loop through each row ('1' to '8')
            for (let row = 1; row <= 8; row++) {
                let spaceID = col + row;
                this.board[spaceID] = null;
            }
        }
        this.player1 = new player('White', player1Name, this.board);
        this.player2 = new player('Black', player2Name, this.board);
        this.currentPlayer = this.player1;
        // console.log(this.board);
    }
    
    start() {
        console.log(`${this.player1.name} vs ${this.player2.name} - Let the game begin!`);
    }

    // Methods for setting and clearing the selected piece
    setSelected(pc) {
        this.selectedpiece = pc;
        this.selectedpiece.updateOptions(this.board);
    }
    clearSelected(){
        this.selectedpiece = null;
    }
    getPlayer() {
        return this.currentPlayer;
    }
    
    promotePawn(){

    }
}

