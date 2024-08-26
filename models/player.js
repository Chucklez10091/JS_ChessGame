import pawn from "./pawn.js";
import rook from "./rook.js";
import knight from "./knight.js";
import bishop from "./bishop.js";
import queen from "./queen.js";
import king from "./king.js";

export default class player{
    name;
    color;
    pieces;
    king;
    opponent;
    in_check;

    constructor(color, nm, board){
        this.color = color;
        this.name = nm;
        this.pieces = this.initializePieces();

        for (let piece of this.pieces){
            if (board.setPieceTo(piece, piece.loc) === false){
                // Throw an error if any piece placement returns false
                throw new Error("could not initialize " + this.color + " player pieces at " + piece.loc);
            }
        }
    }

    initializePieces(){
        let temp = [];
        
        for (let i = 0; i < 8; i++) {
            let letter = String.fromCharCode('a'.charCodeAt(0) + i);
            let pID = (this.color == 'White') ? "w_p_" : "b_p_";
            let xy = (this.color == 'White') ? i+8 : 48+i;
            temp.push(new pawn(this.color, pID.concat(letter), xy));
        }
        
        let pID = (this.color == 'White') ? "w_r_a" : "b_r_a";
        let xy = (this.color == 'White') ? 0 : 56;
        temp.push(new rook(this.color, pID, xy));

        pID = (this.color == 'White') ? "w_n_b" : "b_n_b";
        xy = (this.color == 'White') ? 1 : 57;
        temp.push(new knight(this.color, pID, xy));

        pID = (this.color == 'White') ? "w_b_c" : "b_b_c";
        xy = (this.color == 'White') ? 2 : 58;
        temp.push(new bishop(this.color, pID, xy));

        pID = (this.color == 'White') ? "w_q" : "b_q";
        xy = (this.color == 'White') ? 3 : 59;
        temp.push(new queen(this.color, pID, xy));
        
        pID = (this.color == 'White') ? "w_k" : "b_k";
        xy = (this.color == 'White') ? 4 : 60;
        this.king = new king(this.color, pID, xy);
        temp.push( this.king );

        pID = (this.color == 'White') ? "w_b_f" : "b_b_f";
        xy = (this.color == 'White') ? 5 : 61;
        temp.push(new bishop(this.color, pID, xy));
        
        pID = (this.color == 'White') ? "w_n_g" : "b_n_g";
        xy = (this.color == 'White') ? 6 : 62;
        temp.push(new knight(this.color, pID, xy));

        pID = (this.color == 'White') ? "w_r_h" : "b_p_h";
        xy = (this.color == 'White') ? 7 : 63;
        temp.push(new rook(this.color, pID, xy));

        return temp;
    }  

    setOpponent(opponent){
        if (opponent instanceof player) this.opponent = opponent;
    }

    getPiece(pieceID){
        for (let x of this.pieces){
            if (x.pc_id == pieceID) {return x;}
        }
        return null;
    }

    getName(){
        return this.name;
    }

    promotePawn(pawn_to_promote, pieceType){
        // initialize new piece
        let promoted_piece;
        switch(pieceType){
            case 'queen':
                promoted_piece = new queen(this.color, pawn_to_promote.pieceID, pawn_to_promote.loc);
                break;
            case 'knight':
                promoted_piece = new knight(this.color, pawn_to_promote.pieceID, pawn_to_promote.loc);
                break;
            case 'bishop':
                promoted_piece = new bishop(this.color, pawn_to_promote.pieceID, pawn_to_promote.loc);
                break;
            case 'rook':
                promoted_piece = new rook(this.color, pawn_to_promote.pieceID, pawn_to_promote.loc);
                break;
            default: 
                promoted_piece = new queen(this.color, pawn_to_promote.pieceID, pawn_to_promote.loc);
                break;
        }
        // remove pawn from players pieces
        this.pieces = this.pieces.filter( (pc) => {
            return pc !== pawn_to_promote;
        });
        // Add new piece to pieces list
        this.pieces.push(promoted_piece);
        
        return promoted_piece;
    }
};
