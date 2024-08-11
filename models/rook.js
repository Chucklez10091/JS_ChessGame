import piece from "./piece.js";

export default class rook extends piece{
    constructor(color, pID, xy){
        super(color, pID, xy);
        this.img = (this.color === 'White') ? '../images/white-rook.png' : '../images/black-rook.png'
        this.initializeDivInfo();
    }

    updateOptions(){
        // TODO: implement rook scan
        
    };
}