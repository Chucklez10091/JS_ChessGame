class rook extends piece{
    constructor(){
        switch (this.color){
            case 'Black':
                this.img = '../images/black-rook.png';
                break;
            case 'White':
                this.img = '../images/white-rook.png';
                break;
            default:
                throw new Error("did not find appropriate color!");
        }
    }

    updateOptions(){
        // TODO: implement rook scan
        
    };
}