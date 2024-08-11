import piece from "./piece.js";

export default class knight extends piece{
    constructor(color, pID, xy){
        super(color, pID, xy);
        this.img = (this.color === 'White') ? '../images/white-knight.png' : '../images/black-knight.png'
        this.initializeDivInfo();
    }

    updateOptions(){
        // TODO: implement knight scan
        
    };
}