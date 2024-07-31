class queen extends piece{
    constructor(){
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