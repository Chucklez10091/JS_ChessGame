import pawn from "../models/pawn.js";
import player from "../models/player.js";
import board from "../models/board.js";
//import { piece } from "../models/piece.js";

export default class game {
    player1; player2;
    selectedpiece = null;
    currentPlayer;
    chessBoard;
    last_move = {
        piece: null,        
        targetPosition: null  
    };
    moveOptions = [];

    constructor(player1Name = 'White', player2Name = 'Black') {
        this.chessBoard = new board();
        this.player1 = new player('White', player1Name, this.chessBoard);
        this.player2 = new player('Black', player2Name, this.chessBoard);
        this.currentPlayer = this.player1;
        console.log(this.chessBoard)
    }
    
    start() {
        console.log(`${this.player1.name} vs ${this.player2.name} - Let the game begin!`);
    }

    // Methods for setting and clearing the selected piece
    setSelected(location) {
        this.clearSelected();
        this.selectedpiece = this.chessBoard.getPieceAt(location);
        this.moveOptions = this.selectedpiece.getOptions(this.chessBoard);
    }
    clearSelected(){
        this.selectedpiece = null;
        this.moveOptions = [];
    }
    getSelected(){
        return this.selectedpiece;
    }
    getPlayer() {
        return this.currentPlayer;
    }

    movePiece(targetPosition){
        
        this.selectedpiece.move(parseInt(targetPosition), this.chessBoard);
        
        return true;
    }

    capture(targetPiece){
        targetPiece.captured = true;
        this.chessBoard[targetPiece.loc].piece = null;
        // TODO: add additional capture logic
    }

    enPassant(piece, targetPosition){
        let capPosition = targetPosition[0] + piece.loc[1];
        
        this.capture(this.board[capPosition]);
    }
    
    endTurn(){
        if (this.getPlayer() == this.player1){
            this.clearSelected();
            this.currentPlayer = this.player2;
        }
        else {
            this.clearSelected();
            this.currentPlayer = this.player1;
        }
        return this.currentPlayer.getName();
    }
}

