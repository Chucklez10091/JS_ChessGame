import game from "./game.js";

export default class displayController{
    constructor(){

    }
    
    gamesetup() {
        let ex_game = new game();
        
        // Loop through player 1 pieces
        for (let gamepiece of ex_game.player1.pieces) {
            let loc = gamepiece.loc;

            $('#' + loc).html(gamepiece.divInfo);
            $('#' + loc).attr('chess', gamepiece.pc_id);
        }

        // loop through player 2 pieces
        for (let gamepiece of ex_game.player2.pieces) {
            let loc = gamepiece.loc;

            $('#' + loc).html(gamepiece.divInfo);
            $('#' + loc).attr('chess', gamepiece.pc_id);
        }
        ex_game.start();
        return ex_game;
    }

    addDots(cellstoadd) {
    
        for (let cellId of cellstoadd){
            const cell = document.getElementById(cellId);
            if (cell) {
            const mo = document.createElement('div');
            mo.classList.add('moveoption');
            cell.appendChild(mo);
            
            const dot = document.createElement('div');
            dot.classList.add('dot');
            mo.appendChild(dot);
            }
        }
    }

    addCaps(cellstoadd) {
    
        for (let cellId of cellstoadd){
            const cell = document.getElementById(cellId);
            if (cell) {
            const mo = document.createElement('div');
            mo.classList.add('moveoption');
            cell.appendChild(mo);
            
            const dot = document.createElement('div');
            dot.classList.add('capdot');
            mo.appendChild(dot);
            }
        }
    }

    clearDots() {
        const elements = document.querySelectorAll(`.moveoption`);

        // Loop through the selected elements and remove the class
        elements.forEach(element => {
            element.remove('moveoption');
        });
    }

    updateLocation(selectedpiece, targetLoc, board){
        this.clearDots();
        let $sourceCell = $('#' + selectedpiece.loc);
        let $destCell = $('#' + targetLoc);

        let $chessPiece = $sourceCell.find('.chess-piece');

        $destCell.append($chessPiece);
        $destCell.attr('chess', $sourceCell.attr('chess'));
        $sourceCell.attr('chess', 'null');
    }
}