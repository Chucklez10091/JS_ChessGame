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

    initializePieces(){
        let temp = [];
        
        for (let i = 0; i < 8; i++) {
            let letter = String.fromCharCode('a'.charCodeAt(0) + i);
            let pID = (this.color == 'White') ? "w_p_" : "b_p_";
            let xy = (this.color == 'White') ? [letter, '2'] : [letter, '7'];
            temp.push(new pawn(this.color, pID.concat(letter), xy));
        }
        
        let pID = (this.color == 'White') ? "w_r_a" : "b_r_a";
        let xy = (this.color == 'White') ? ['a' , '1'] : ['a' , '8'];
        temp.push(new rook(this.color, pID, xy));

        pID = (this.color == 'White') ? "w_n_b" : "b_n_b";
        xy = (this.color == 'White') ? ['b' , '1'] : ['b' , '8'];
        temp.push(new knight(this.color, pID, xy));

        pID = (this.color == 'White') ? "w_b_c" : "b_b_c";
        xy = (this.color == 'White') ? ['c' , '1'] : ['c' , '8'];
        temp.push(new bishop(this.color, pID, xy));

        pID = (this.color == 'White') ? "w_q" : "b_q";
        xy = (this.color == 'White') ? ['d' , '1'] : ['d' , '8'];
        temp.push(new queen(this.color, pID, xy));
        
        pID = (this.color == 'White') ? "w_k" : "b_k";
        xy = (this.color == 'White') ? ['e' , '1'] : ['e' , '8'];
        temp.push(new king(this.color, pID, xy));

        pID = (this.color == 'White') ? "w_b_f" : "b_b_f";
        xy = (this.color == 'White') ? ['f' , '1'] : ['f' , '8'];
        temp.push(new bishop(this.color, pID, xy));
        
        pID = (this.color == 'White') ? "w_n_g" : "b_n_g";
        xy = (this.color == 'White') ? ['g' , '1'] : ['g' , '8'];
        temp.push(new knight(this.color, pID, xy));

        pID = (this.color == 'White') ? "w_r_h" : "b_p_h";
        xy = (this.color == 'White') ? ['h' , '1'] : ['h' , '8'];
        temp.push(new rook(this.color, pID, xy));

        return temp;
    }

    constructor(col, nm){
        this.color = col;
        this.name = nm || this.color;
        this.pieces = this.initializePieces();
    }
};
