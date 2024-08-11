import piece from "./piece.js";

export default class queen extends piece{
    constructor(color, pID, xy){
        super(color, pID, xy);
        this.img = (this.color === 'White') ? '../images/white-queen.png' : '../images/black-queen.png'
        this.initializeDivInfo();
    }

    updateOptions(){
        // TODO: implement queen scan
        
    };
}