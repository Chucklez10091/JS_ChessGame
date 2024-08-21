import piece from "./piece.js";

export default class queen extends piece{
    constructor(color, pID, xy){
        super(color, pID, xy);
        this.img = (this.color === 'White') ? '../images/white-queen.png' : '../images/black-queen.png'
        this.initializeDivInfo();
    }

    updateOptions(board){
        this.can_move = [];
        // next square up/down is +-8, left/right is +-1
        const directions = [-9, -8, -7, -1, 1, 7, 8, 9];
        const is_edge = this.loc % 8;
        for (let dir of directions){
            if ((is_edge === 0 && [7, -1, -9].includes(dir)) || (is_edge === 7 && [-7, 1, 9].includes(dir))){
                continue;
            }
            let next_space = this.loc + dir;
            while(next_space >= 0 && next_space < 64){
                let opp_pc = board.getPieceAt(next_space);
                if (opp_pc !== null){
                    if (opp_pc.color !== this.color){
                        this.can_move.push(next_space);
                    }
                    break;
                }
                this.can_move.push(next_space);
                if ((next_space % 8 === 0 && [7, -1, -9].includes(dir)) || (next_space % 8 === 7 && [-7,1,9].includes(dir))){
                    break;
                }
                next_space += dir;
            }
        }
    };
}