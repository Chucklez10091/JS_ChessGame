import piece from "./piece.js";

export default class pawn extends piece{
    constructor(color, pID, xy){
        super(color, pID, xy);
        switch (this.color){
            case 'Black':
                this.img = '../images/black-pawn.png';
                break;
            case 'White':
                this.img = '../images/white-pawn.png';
                break;
            default:
                throw new Error("did not find appropriate color!");
        }
    }

    updateOptions(){
        this.can_move = [];
        this.can_move.push([this.loc[0], this.loc[1] + 1]);
        if (!this.moved) this.can_move.push([this.loc[0], this.loc[1] + 2]);
        
    };

    move(tar_loc){
        this.updateOptions();
        if (this.can_move.includes(tar_loc)) this.loc = tar_loc;
        this.moved = true;
        if (this.loc[1] == 8 || this.loc[1] == 0){
            
        }
    }
}