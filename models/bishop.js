class bishop extends piece{
    constructor(){
        switch (this.color){
            case 'Black':
                this.img = '../images/black-bishop.png';
                break;
            case 'White':
                this.img = '../images/white-bishop.png';
                break;
            default:
                throw new Error("did not find appropriate color!");
        }
    }

    updateOptions(){
        // TODO: implement bishop scan
        
    };
}