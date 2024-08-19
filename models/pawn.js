import piece from "./piece.js";

export default class pawn extends piece{
    movedTwoSquares = false;

    constructor(color, pID, xy){
        super(color, pID, xy);
        
        this.img = (this.color === 'White') ? '../images/white-pawn.png' : '../images/black-pawn.png'
        
        this.initializeDivInfo();
    }

    updateOptions(board){
        this.can_move = [];
        let direction = (this.color == 'White') ? 1 : -1;
        let nextmv = this.loc + direction*8;
        if (board.getPieceAt(nextmv) === null){
            this.can_move.push(nextmv);
            nextmv += direction*8
            if (!(this.moved) && 
                board.getPieceAt(nextmv) === null){
                    this.can_move.push(nextmv);
            }
        }
        
        // Check for capture options
        let opp_pcs = [board.getPieceAt(this.loc + 7*direction), board.getPieceAt(this.loc + 7*direction)];
        // for each space diagonal from pawn
        for (let opt of opp_pcs){
            if (opt !== null){      // piece exists
                if (opt.color !== this.color){      // piece is opponent's piece
                    this.can_move.push(opt.loc);
                }
            }
        }

        this.can_en_passant(board);
        
    };

    can_en_passant(board){
        const left_opt = board.getPieceAt(Math.max([this.loc - 1, 0]));
        const right_opt = board.getPieceAt(Math.min([this.loc + 1, 63]));
        let can_ep = false
        if (left_opt instanceof pawn){
            if (left_opt.color !== this.color && 
                left_opt.movedTwoSquares &&
                getPieceAt(left_opt.loc + (this.color === 'White' ? 1 : -1)*8) === null
            ){
                this.can_move.push(left_opt.loc + (this.color === 'White' ? 1 : -1)*8);
            }
        }
        if (right_opt instanceof pawn){
            if (right_opt.color !== this.color && 
                right_opt.movedTwoSquares &&
                getPieceAt(right_opt.loc + (this.color === 'White' ? 1 : -1)*8) === null
            ){
                this.can_move.push(right_opt.loc + (this.color === 'White' ? 1 : -1)*8);
            }
        }
    }
}