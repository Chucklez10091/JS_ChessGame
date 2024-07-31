class knight extends piece{
    constructor(){
        switch (this.color){
            case 'Black':
                this.img = '../images/black-knight.png';
                break;
            case 'White':
                this.img = '../images/white-knight.png';
                break;
            default:
                throw new Error("did not find appropriate color!");
        }
    }

    updateOptions(){
        // TODO: implement knight scan
        
    };
}