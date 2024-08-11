/**
 * Abstract piece class
 * 
 * @class piece
 */
export default class piece{
    pc_id;
    img;
    loc;
    captured;
    moved;
    can_move;
    color;
    divInfo;

    constructor(color, pID, xy) {
        if (this.constructor == piece) {
          throw new Error("Abstract classes can't be instantiated.");
        };

        this.color = color;
        this.loc = xy;
        this.pc_id = pID;
        this.captured = false;
        this.moved = false;
    }

    initializeDivInfo() {
        if (!this.img) {
            throw new Error("Subclass must initialize 'img' before calling initializeDivInfo.");
        }

        // Create a <div> container with a class and insert the image inside it
        this.divInfo = $('<div>')
            .addClass('chess-piece')
            .attr('data-piece', this.pc_id);

        // Create an <img> element and set its src attribute to the filepath
        const imgElement = $('<img>').attr('src', this.img);
        this.divInfo.append(imgElement);
    }

    updateOptions(board){
        if (this.constructor == piece) {
            throw new Error("Method 'updateOptions()' must be implemented.");
        }
        // TODO: check for pins
    }

    move(tar_loc){
        this.updateOptions();
        if (this.can_move.includes(tar_loc)) this.loc = tar_loc;
        this.moved = true;
    }

};