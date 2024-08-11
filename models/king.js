import piece from "./piece.js";

export default class king extends piece{
    constructor(color, pID, xy){
        super(color, pID, xy);
        this.img = (this.color === 'White') ? '../images/white-king.png' : '../images/black-king.png'
        this.initializeDivInfo();
    }

    updateOptions(){
        // TODO: implement king scan
        
    };
}