import displayController from './controllers/displayController.js';
import king from './models/king.js';
import pawn from './models/pawn.js';

$(document).ready(function() {
  
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

    // If a piece is selected and a move option is clicked
    if ($clickedCell.find('.moveoption').length > 0) {
      // Opponent's piece already occupies square
      if ($clickedCell.find('.chess-piece').length > 0) {
        dc.capturePiece($clickedCell);
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
        dc.movePiece($clickedCell);
      }
    }

    // If a piece is clicked (and it's the current player's piece)
    else if ($clickedCell.find('.chess-piece').length > 0) {
      let selectedPiece = dc.getPieceAt($clickedCell);

      if (selectedPiece.getColor() === dc._game.getPlayer().color) {
        dc.clearDots(); // Clear any previous move options
        dc.pieceSelected($clickedCell); // Select the clicked piece
      }
    }

    else{
      dc.clearDots();
    }
  });
  /* $('.gamecell').on('click', '.moveoption', function() {
    dc.updateLocation($(this.closest('.gamecell')));
  });

  // Set selected piece and show available moves when piece clicked
  $('.gamecell').on('click', '.chess-piece',function() {
    
    if (dc.getPieceAt($(this.closest('.gamecell'))).getColor() === dc._game.getPlayer().color){
      dc.clearDots();
      dc.pieceSelected($(this.closest('.gamecell')));
    }
  }); */

  

});