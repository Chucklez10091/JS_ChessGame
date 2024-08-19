import game from "./game.js";

export default class displayController{
    _game;
    constructor(){
        this._game = new game('White', 'Black');
        
        // Loop through player 1 pieces
        for (let gamepiece of this._game.player1.pieces) {
            let loc = gamepiece.loc;

            $('#' + loc).html(gamepiece.divInfo);
            $('#' + loc).attr('chess', gamepiece.pc_id);
        }

        // loop through player 2 pieces
        for (let gamepiece of this._game.player2.pieces) {
            let loc = gamepiece.loc;

            $('#' + loc).html(gamepiece.divInfo);
            $('#' + loc).attr('chess', gamepiece.pc_id);
        }
        this._game.start();
    }
    
    pieceSelected(parent){
        // set selectedPiece to clicked piece
        this._game.setSelected(parent.attr('id'));

        const div = document.createElement('div');
        div.classList.add('selected-piece');
        parent.append(div);

        this.addDots();
    }
    getPieceAt(div){
        let location = div.attr('id');
        return this._game.chessBoard.getPieceAt(location);
    }

    addDots() {
        let cellstoadd = this._game.moveOptions;
        
        if (cellstoadd === undefined) return;
        for (let cellId of cellstoadd){
            const cell = document.getElementById(cellId);
            if (cell) {
            const mo = document.createElement('div');
            mo.classList.add('moveoption');
            cell.appendChild(mo);
            }
        }
    }

    clearDots() {
        const elements = document.querySelectorAll(`.selected-piece`);
        const opts = document.querySelectorAll(`.moveoption`);

        // Loop through the selected elements and remove the class
        elements.forEach(pc =>{
            pc.remove('selectedpiece');
        });
        opts.forEach(element => {
            element.remove('moveoption');
        });
    }

    updateLocation(targetLoc){
        let x = this._game.movePiece(targetLoc.attr('id'));
        if (x){
            let $sourceCell = $(document.querySelector(`.selected-piece`).parentElement);
            let $destCell = $(targetLoc);

            let $chessPiece = $sourceCell.find('.chess-piece');

            $destCell.append($chessPiece);
            $destCell.attr('chess', $sourceCell.attr('chess'));
            $sourceCell.attr('chess', 'null');
            this.clearDots();

            this.endTurn();
        }
    }

    endTurn(){
        const name = this._game.endTurn();
        console.log(this._game.chessBoard);
        $('#turn').html("It's " + name + "'s Turn");
    }
}