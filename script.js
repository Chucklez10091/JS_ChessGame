import displayController from './controllers/displayController.js';
import king from './models/king.js';
import pawn from './models/pawn.js';

$(document).ready(async function() {
  
  const chessboard = $('#gameboard');
  for (let i = 63; i >= 0; i--) {
    const row = Math.floor(i / 8);
    const col = 8 - (i % 8);
    const id = row * 8 + col - 1;
    const cell = $('<div></div>').addClass('gamecell').attr('id', id);
    if ((i + row) % 2 === 1) cell.addClass('dark');

    chessboard.append(cell);
  }

  $('body').contextmenu(function (e) {
    e.preventDefault();
  });

  let dc = new displayController();

  $('.gamecell').on('click', function() {
    let $clickedCell = $(this);
    console.log($clickedCell.attr('id'));

    // If a piece is selected and a move option is clicked
    if ($clickedCell.find('.moveoption').length > 0) {
      // Opponent's piece already occupies square
      if ($clickedCell.find('.chess-piece').length > 0) {
        var legal_move = dc.capturePiece($clickedCell);
      }
      else {
        // Check for specialized moves
        if (dc._game.selectedpiece instanceof pawn && dc.isEnPassant($clickedCell)){
          // Remove the captured pawn
          let capCell = $('#' + dc.enPassantCaptureCell());
          capCell.find('.chess-piece').remove();
        }
        if (dc._game.selectedpiece instanceof king && dc.isCastling($clickedCell)){
          // Execute castle logic
          dc.castleRook($clickedCell);
        }
        var legal_move = dc.movePiece($clickedCell);
      }

      if (legal_move){

        dc.executeLegalMove($clickedCell);
        
      }
    }

    else if ($clickedCell.find('.promotion-select').length > 0){
      // Do Nothing
    }

    // If a piece is clicked (and it's the current player's piece)
    else if ($clickedCell.find('.chess-piece').length > 0 &&
      $clickedCell.find('.promotion-select').length === 0) {
        
      let selectedPiece = dc.getPieceAt($clickedCell);

      if (selectedPiece.getColor() === dc._game.getPlayer().color) {
        console.log('clear dots2');
        dc.clearDots(); // Clear any previous move options
        dc.pieceSelected($clickedCell); // Select the clicked piece
      }
    }

    else{
      console.log('clear dots1');
      dc.clearDots();
    }
  });
  

});