class king extends piece{
    constructor(){
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