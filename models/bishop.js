import piece from "./piece.js";

export default class bishop extends piece{
    constructor(color, pID, xy){
        super(color, pID, xy);
        this.img = (this.color === 'White') ? '../images/white-bishop.png' : '../images/black-bishop.png'
        this.initializeDivInfo();
    }

    updateOptions(){
        // TODO: implement bishop scan
        
    };
}