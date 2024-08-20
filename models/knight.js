import piece from "./piece.js";

export default class knight extends piece{
    constructor(color, pID, xy){
        super(color, pID, xy);
        this.img = (this.color === 'White') ? '../images/white-knight.png' : '../images/black-knight.png'
        this.initializeDivInfo();
    }

    updateOptions(board){
        let directions = [17,10,-6,-15,-17,-10,6,15]
        let temp = [];
        let col = this.color;
        const is_edge = this.loc % 8;
        if (is_edge > 0){
            if(this.loc + 15 < 64){temp.push(this.loc + 15);}
            if(this.loc - 15 >= 0){temp.push(this.loc - 17);}
        }
        if (is_edge > 1){
            if(this.loc + 6 < 64){temp.push(this.loc + 6);}
            if(this.loc - 6 >= 0){temp.push(this.loc - 10);}
        }
        if (is_edge < 7){
            if(this.loc + 17 < 64){temp.push(this.loc + 17);}
            if(this.loc - 17 >= 0){temp.push(this.loc - 15);}
        }
        if (is_edge < 6){
            if(this.loc + 10 < 64){temp.push(this.loc + 10);}
            if(this.loc - 10 >= 0){temp.push(this.loc - 6);}
        }
        this.can_move = temp.filter(function(element) {
            let pc = board.getPieceAt(element);
            if (pc === null){return element;}
            else{
                if (pc.color !== col){ return element;}
            }
        });
    }
}