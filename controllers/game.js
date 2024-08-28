import pawn from "../models/pawn.js";
import player from "../models/player.js";
import board from "../models/board.js";
import king from "../models/king.js";
import piece from "../models/piece.js";

export default class game {
    player1; player2;
    selectedpiece = null;
    currentPlayer;
    chessBoard;
    protoBoard;
    last_move = {
        piece: null,        
        targetPosition: null  
    };
    moveOptions = [];
    result = "0";

    constructor(player1Name = 'White', player2Name = 'Black') {
        this.chessBoard = new board();
        this.player1 = new player('White', player1Name, this.chessBoard);
        this.player2 = new player('Black', player2Name, this.chessBoard);
        this.player1.setOpponent(this.player2);
        this.player2.setOpponent(this.player1);
        this.currentPlayer = this.player1;
    }
    
    start() {
        console.log(`${this.player1.name} vs ${this.player2.name} - Let the game begin!`);
        this.startTurn();
    }

    // Methods for setting and clearing the selected piece
    setSelected(location) {
        console.log('setSelected()');
        this.clearSelected();
        this.selectedpiece = this.chessBoard.getPieceAt(location);
        
        this.moveOptions = this.selectedpiece.can_move;
    }

    startTurn(){
        console.log('startTurn()');
        const moves = this.scanMoves(this.currentPlayer);
        console.log(moves);
        if (moves.length < 1){
            let game_result = this.currentPlayer.in_check ? (this.currentPlayer.opponent.color + ` wins by checkmate!`) : 'Stalemate!';
            this.endGame(game_result);
        }
        else{
            console.log(this.currentPlayer.color, 'is in check: ', this.currentPlayer.in_check);
        }
    }

    clearSelected(){
        console.log('clearSelected');
        this.selectedpiece = null;
        this.moveOptions = [];
    }

    getSelected(){
        return this.selectedpiece;
    }

    getPlayer() {
        return this.currentPlayer;
    }

    simulate(piece, destLocation){
        console.log('simulate()', piece.pc_id);
        const originalPiece = this.chessBoard.removePieceAt(destLocation);
        const sourceLocation = piece.loc;

        // if the checking piece is going to be captured
        if (originalPiece !== null){
            this.chessBoard.removePieceAt(sourceLocation);
            this.cursoryScan(this.currentPlayer.opponent);
            if (originalPiece.can_move.includes(this.currentPlayer.king.loc)) return true;
            this.chessBoard.setPieceTo(piece, sourceLocation);
        }

        // proxy moving the piece to the spot without other updates
        this.chessBoard.setPieceTo(piece, destLocation);
        this.chessBoard.removePieceAt(sourceLocation);
        piece.loc = destLocation;
        

        const opponent_moves = this.cursoryScan(this.currentPlayer.opponent);
        const isKingInCheck = this.scanChecks(this.currentPlayer.opponent, opponent_moves);

        this.chessBoard.removePieceAt(destLocation);
        piece.loc = sourceLocation;
        this.chessBoard.setPieceTo(originalPiece, destLocation);
        this.chessBoard.setPieceTo(piece, sourceLocation);

        return !isKingInCheck;
    }
    
    scanMoves(_player){
        console.log('scanMoves()');
        let temp = [];
        for (let piece of _player.pieces){
            if (piece instanceof king && this.currentPlayer === _player){
                piece.updateOptions(this.chessBoard);
                this.canCastle();
            }
            else{
                piece.getOptions(this.chessBoard);
            }
            console.log(piece.pc_id, piece.can_move);
            piece.can_move = piece.can_move.filter( (move) => {
                return this.simulate(piece, move);
            });
            
        
            temp = temp.concat(piece.can_move);
        }
        return temp;
    }

    cursoryScan(_player){
        console.log('cursoryScan()');
        let temp = [];
        for (let piece of _player.pieces){

            piece.getOptions(this.chessBoard);
        
            temp = temp.concat(piece.can_move);
        }
        return temp;
    }

    scanChecks(player, visiblesquares){
        console.log('scanChecks()');
        if (visiblesquares.includes(player.opponent.king.loc)){
            return true;
        }
        return false;
    }

    movePiece(targetPosition){
        console.log('MovePiece()');
        const tar_loc = parseInt(targetPosition);
        
        if (this.moveOptions.includes(tar_loc)){ 
            
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

            //// Move the piece ////
            this.selectedpiece.move(tar_loc, this.chessBoard);

            // // Check pawn promotion //
            // if (this.selectedpiece instanceof pawn && 
            //     ([0, 7].includes(Math.floor(this.selectedpiece.loc / 8)))){
            //         this.promotePawn(this.selectedpiece);
            // }

            //// Clean up ////

            

            return true;
        }
        return false;
    }

    canCastle(){
        console.log('canCastle()');
        if (this.currentPlayer.king.moved){
            return false;
        }
        let res = false;
        const kLoc = (this.currentPlayer.color === 'White') ? 4 : 60;
        const attacked_spaces = this.cursoryScan(this.currentPlayer.opponent);

        // Kingside castle
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

    capture(targetLocation){
        console.log('capture()');
        const captured_piece = this.chessBoard.capturePieceAt(targetLocation);
        this.currentPlayer.opponent.pieces = this.currentPlayer.opponent.pieces.filter( (pc) => {
            return pc !== captured_piece
        });
        console.log(this.currentPlayer.opponent.pieces);
    }

    enPassant(targetPosition){
        console.log('enPassant()');
        let capPosition = targetPosition + (this.selectedpiece.color === 'White' ? -8 : 8);
        
        this.capture(capPosition);
    }

    promotePawn(location, piece){
        // capture the pawn on the board
        this.chessBoard.capturePieceAt(location);
        // replace the pawn in the player's piece list
        this.selectedpiece = this.currentPlayer.promotePawn(this.selectedpiece, piece);
        // add new piece to the board
        this.chessBoard.setPieceTo(this.selectedpiece, this.selectedpiece.loc);
        // TODO: remove new piece type from captured pieces list if present
    }

    endTurn(){
        console.log('endturn()');
        //scan for checks on opponent//
        this.currentPlayer.opponent.in_check = this.scanChecks(this.currentPlayer, this.cursoryScan(this.currentPlayer));
        // reset double pawn push flags
        if (this.last_move.piece instanceof pawn) this.last_move.piece.setTwoSquares(-1);
        // update last move
        this.last_move = {piece: this.selectedpiece, targetPosition: this.selectedpiece.loc};
        // TODO: add move to pgn
        
        const temp = this.currentPlayer;
        this.clearSelected();
        this.currentPlayer = temp.opponent;
        return this.currentPlayer.getName();
    }

    endGame(result){
        this.result = result;
        this.currentPlayer = null;
        // TODO: set game over flag and perform cleanup (save pgn file, Display winner, etc.)
    }
}

