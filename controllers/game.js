import pawn from "../models/pawn.js";
import player from "../models/player.js";
import board from "../models/board.js";
import king from "../models/king.js";
import piece from "../models/piece.js";
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
        if (this.selectedpiece instanceof king){
            this.selectedpiece.updateOptions(this.chessBoard);
            let cc = this.canCastle();
            this.moveOptions = this.selectedpiece.can_move;
        }else{
            this.moveOptions = this.selectedpiece.getOptions(this.chessBoard);
        }
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
        const tar_loc = parseInt(targetPosition);
        
        if (this.selectedpiece.can_move.includes(tar_loc)){ 
            
            if (this.selectedpiece instanceof pawn){
                if ([7,9].includes(Math.abs(tar_loc - this.selectedpiece.loc))){
                    if (this.chessBoard.getPieceAt(tar_loc) === null){
                        console.log("en passant!");
                        this.enPassant(tar_loc);
                    }
                    else{
                        this.capture(tar_loc);
                    }
                }
            }
            else if (this.selectedpiece instanceof king){
                // castling logic
                if (targetPosition - this.selectedpiece.loc === 2){
                    let rook = this.chessBoard.getPieceAt(this.selectedpiece.loc + 3);
                    this.chessBoard.setPieceTo(rook, this.selectedpiece.loc + 1);
                    this.chessBoard.removePieceAt(this.selectedpiece.loc + 3);
                }
                if (this.selectedpiece.loc - targetPosition === 2){
                    let rook = this.chessBoard.getPieceAt(this.selectedpiece.loc - 4);
                    this.chessBoard.setPieceTo(rook, this.selectedpiece.loc - 1);
                    this.chessBoard.removePieceAt(this.selectedpiece.loc - 4);
                }
                // capture logic
                if (this.chessBoard.getPieceAt(tar_loc) !== null){
                    this.capture(tar_loc);
                }
            }
            else{
                if (this.chessBoard.getPieceAt(tar_loc) !== null){
                    this.capture(tar_loc);
                }
            }

            // Move the piece
            this.selectedpiece.move(tar_loc, this.chessBoard);

            // Clean up
            if (this.last_move.piece instanceof pawn) this.last_move.piece.setTwoSquares(-1);
            this.last_move = {piece: this.selectedpiece, targetPosition: tar_loc}

            return true;
        }
        return false;
    }

    capture(targetLocation){
        this.chessBoard.capturePieceAt(targetLocation);
        // TODO: add additional capture logic
    }

    enPassant(targetPosition){
        let capPosition = targetPosition + (this.selectedpiece.color === 'White' ? -8 : 8);
        
        this.capture(capPosition);
    }

    scanAttacks(){
        const opponent = this.currentPlayer.color === 'White' ? this.player2 : this.player1;
        let temp = [];
        for (let piece of opponent.pieces){
            piece.updateOptions(this.chessBoard);
            temp = temp.concat(piece.can_move);
        }
        return temp;
    }

    canCastle(){
        if (!(this.selectedpiece instanceof king) || this.selectedpiece.moved){
            return false;
        }
        let res = false;

        // Kingside castle
        const kLoc = (this.currentPlayer.color === 'White') ? 4 : 60;
        const attacked_spaces = this.scanAttacks();
        if (attacked_spaces.includes(kLoc)) return res;
        if (this.chessBoard.getPieceAt(kLoc+1) === null && 
            this.chessBoard.getPieceAt(kLoc+2) === null &&
            this.chessBoard.getPieceAt(kLoc+3).moved === false){
                if (!(attacked_spaces.includes(kLoc+1) || attacked_spaces.includes(kLoc+2))){
                    this.chessBoard.getPieceAt(kLoc).allowCastleAt(kLoc+2);
                    res = true;
                }
        }
        // Queenside castle
        if (this.chessBoard.getPieceAt(kLoc-1) === null && 
            this.chessBoard.getPieceAt(kLoc-2) === null&&
            this.chessBoard.getPieceAt(kLoc-4).moved === false){
                if (!(attacked_spaces.includes(kLoc-1) || attacked_spaces.includes(kLoc-2))){
                    this.chessBoard.getPieceAt(kLoc).allowCastleAt(kLoc+2);
                    res = true;
                }
        }
        return res;
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

