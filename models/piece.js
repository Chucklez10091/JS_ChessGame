/**
 * Abstract piece class
 * 
 * @class piece
 */
class piece{
    pc_id;
    img;
    loc;
    captured;
    moved;
    can_move;
    color;

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

    updateOptions(){
        throw new Error("Method 'updateOptions()' must be implemented.");
    }

    move(tar_loc){
        this.updateOptions();
        if (this.can_move.includes(tar_loc)) this.loc = tar_loc;
        this.moved = true;
    }

};