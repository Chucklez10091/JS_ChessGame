import piece from "./piece.js";

export default class queen extends piece{
    constructor(color, pID, xy){
        super(color, pID, xy);
        switch (this.color){
            case 'Black':
                this.img = '../images/black-queen.png';
                break;
            case 'White':
                this.img = '../images/white-queen.png';
                break;
            default:
                throw new Error("did not find appropriate color!");
        }
    }

    updateOptions(){
        // TODO: implement queen scan
        
    };
}