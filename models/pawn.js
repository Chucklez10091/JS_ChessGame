import piece from "./piece.js";

export default class pawn extends piece{
    constructor(color, pID, xy){
        super(color, pID, xy);
        
        this.img = (this.color === 'White') ? '../images/white-pawn.png' : '../images/black-pawn.png'
        
        this.initializeDivInfo();
    }

    updateOptions(board){
        this.can_move = [];
        let direction = (this.color == 'White') ? 1 : -1;
        let col = this.loc[0];
        let row = parseInt(this.loc[1]);

        let nextrw = row + direction;
        if (board[(col + nextrw)] === null){
            this.can_move.push(col + nextrw);
            if (!this.moved) {
                nextrw += direction;
                if (board[col + nextrw] === null) {
                    this.can_move.push(col + nextrw);    
                }
            }
        }
    };

    move(tar_loc, board){
        this.updateOptions(board);
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
}