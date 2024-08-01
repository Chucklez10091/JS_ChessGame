import piece from "./piece.js";

export default class king extends piece{
    constructor(color, pID, xy){
        super(color, pID, xy);
        switch (this.color){
            case 'Black':
                this.img = '../images/black-king.png';
                break;
            case 'White':
                this.img = '../images/white-king.png';
                break;
            default:
                throw new Error("did not find appropriate color!");
        }
    }

    updateOptions(){
        // TODO: implement king scan
        
    };
}