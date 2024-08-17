import game from './controllers/game.js';
import displayController from './controllers/displayController.js';

$(document).ready(function() {
  
  const chessboard = $('#gameboard');
  for (let i = 63; i >= 0; i--) {
    const row = Math.floor(i / 8);  
    const col = 8 - (i%8);
    const id = row * 8 + col - 1;
      const cell = $('<div></div>').addClass('gamecell').attr('id', id);
       // Determine row and column from id

       // Apply background color based on row and column
       if ((row + col) % 2 === 0) {
        cell.css('background-color', '#769656'); // Dark square
       } else {
        cell.css('background-color', '#eeeed2'); // Light square
       }
      chessboard.append(cell);
  }

  $('body').contextmenu(function(e) {
      e.preventDefault();
  });

  let dc = new displayController();
  let cgame = dc.gamesetup();

  // Set selected piece and show available moves when piece clicked
  $('.chess-piece').on('click', function() {
    // console.log('Piece clicked: ' + $(this).data('piece'));
    cgame.clearSelected();
    dc.clearDots();

    let currpiece = cgame.getPlayer().getPiece($(this).data('piece'));
    cgame.setSelected(currpiece);
    currpiece.updateOptions(cgame.board);
    
    dc.addDots(currpiece.can_move);
    dc.addCaps(currpiece.can_capture);
  });

  // Move selected piece when valid moveoption clicked
  $('.gamecell').on('click', '.moveoption', function() {
    let targetLoc = $(this).closest('.gamecell').attr('id');

    dc.updateLocation(cgame.selectedpiece, targetLoc, cgame.board);
    cgame.movePiece(cgame.selectedpiece, targetLoc);
    cgame.endTurn();
  });

});