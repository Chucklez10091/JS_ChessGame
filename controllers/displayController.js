import pawn from "../models/pawn.js";
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
        let location = parseInt(div.attr('id'));
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

    movePiece(targetLoc){
        let x = this._game.movePiece(targetLoc.attr('id'));
        if (x){
            let $sourceCell = $(document.querySelector(`.selected-piece`).parentElement);
            let $destCell = $(targetLoc);

            let $chessPiece = $sourceCell.find('.chess-piece');

            $destCell.append($chessPiece);
            $destCell.attr('chess', $sourceCell.attr('chess'));
            $sourceCell.attr('chess', 'null');

            return true;
            
        }
        return false;
    }

    capturePiece(targetLoc){
        let x = this._game.movePiece(targetLoc.attr('id'));
        if (x){
            let $sourceCell = $(document.querySelector(`.selected-piece`).parentElement);
            let $destCell = $(targetLoc);

            $destCell.find('.chess-piece').remove();
            let $chessPiece = $sourceCell.find('.chess-piece');

            $destCell.append($chessPiece);
            $destCell.attr('chess', $sourceCell.attr('chess'));
            $sourceCell.attr('chess', 'null');

            return true;
        }
        return false;
    }

    isEnPassant(targetLoc){
        let tar_loc = parseInt(targetLoc.attr('id'));
        if (this._game.last_move.piece instanceof pawn){
            return this._game.last_move.piece.isEnPassant(tar_loc);
        }
    }

    enPassantCaptureCell(){
        return this._game.last_move.targetPosition;
    }

    isCastling(targetLoc){
        const tar_loc = parseInt(targetLoc.attr('id'));
        return Math.abs(tar_loc - this._game.getSelected().loc) === 2;
    }

    castleRook(targetLoc){
        let tar_loc = parseInt(targetLoc.attr('id'));
        let direction = tar_loc - this._game.selectedpiece.loc;
        let rookCell = (direction > 0) ? tar_loc+1 : tar_loc-2;
        
        let $sourceCell = $('#' + rookCell);
        let $destCell = (direction > 0) ? $('#' + (tar_loc-1)) : $('#' + (tar_loc+1));

        let $chessPiece = $sourceCell.find('.chess-piece');

            $destCell.append($chessPiece);
            $destCell.attr('chess', $sourceCell.attr('chess'));
            $sourceCell.attr('chess', 'null');
    }

    async promotion($clickedCell){
        let direction = this._game.currentPlayer === this._game.player1 ? -8 : 8;
        let color = this._game.currentPlayer.color.toLowerCase();
        let location = parseInt($clickedCell.attr('id'));

        let pieceChoice = ['queen', 'bishop', 'knight', 'rook'];
        
        for (let i = 0; i < 4; i++){
            let divLabel = $('<div>')
                .addClass('promotion-select')
                .attr('choice', pieceChoice[i]);
            divLabel.append($('<img>').attr('src', '../images/' + color + '-' + pieceChoice[i] + '.png'));
            $('#' + (location + i * direction)).html(divLabel);
        }

        console.log(this._game.selectedpiece);

        const chosen_piece = await new Promise((resolve) => {
            $('.promotion-select').on('click', 'img', function () {
                resolve($(this).attr('choice'));  // Resolve the promise with the clicked image
            });
        });

        console.log(this._game.selectedpiece);

        this._game.promotePawn(chosen_piece);

        const elements = document.querySelectorAll(`.promotion-select`);

        elements.forEach(pc =>{
            pc.remove('promotion-select');
        });

        $('#' + location).html(this._game.selectedpiece.divInfo);
        $('#' + location).attr('chess', this._game.selectedpiece.pc_id);

    }

    async executeLegalMove($clickedCell){
        // check pawn promotion
        let row = Math.floor($clickedCell.attr('id') / 8);
        if ([0,7].includes(row) && (this._game.selectedpiece instanceof pawn)) {
          await this.promotion($clickedCell);
        }
        
        // Swap turns
        this.swapTurn();
    }

    swapTurn(){
        this.clearDots();

        const name = this._game.endTurn();

        $('#turn').html("It's " + name + "'s Turn");

        this._game.startTurn();

        if (this._game.result !== "0"){
            this.endGame(this._game.result);
        }
    }

    endGame(result){
        $('#turn').html(result);
    }
}