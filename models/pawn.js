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
        this.can_capture = [];
        let direction = (this.color == 'White') ? 1 : -1;
        let col = this.loc[0];
        let row = parseInt(this.loc[1]);

        let nextrw = row + direction;
        
        if (col != 'a'){
            let ltcol = String.fromCharCode(col.charCodeAt(0) - 1);
            let ltcap = board[(ltcol + nextrw)];
            if (ltcap != null && ltcap.color != this.color){
                this.can_capture.push(ltcol + nextrw);
            }
        }
        if (col != 'h'){
            let rtcol = String.fromCharCode(col.charCodeAt(0) - 1);
            let rtcap = board[(rtcol + nextrw)];
            if (rtcap != null && rtcap.color != this.color){
                this.can_capture.push(rtcol + nextrw);
            }
        }


        if (board[(col + nextrw)] == null){
            this.can_move.push(col + nextrw);
            if (!this.moved) {
                nextrw += direction;
                if (board[col + nextrw] === null) {
                    this.can_move.push(col + nextrw);
                    this.movedTwoSquares = true;    
                }
            }
        }
    };

    move(tar_loc, board){
        // this.updateOptions(board);
        if (this.can_move.includes(tar_loc)) {
            board[this.loc] = null;
            this.loc = tar_loc;
            board[this.loc] = this;
        }
        this.moved = true;
        
        if (this.loc[1] == '8' || this.loc[1] == '0'){
            // TODO: call on promotion logic
        }
    }

    can_en_passant(tar_loc, board){
        if (Math.abs(tar_loc[0].charCodeAt(0) - this.loc[0].charCodeAt(0)) === 1 &&
            tar_loc[1] === this.loc[1] + (this.color === 'White' ? 1 : -1) &&
            board[tar_loc] == null
            ){
                let pawnPosition = tar_loc[0] + this.loc[1];
                let targetPawn = board[pawnPosition];

                if (targetPawn instanceof pawn 
                    && targetPawn.color != this.color &&
                    targetPawn.movedTwoSquares
                ){
                    return true;
                }
            }
        return false;
    }
}