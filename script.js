import game from './controllers/game.js';
import displayController from './controllers/displayController.js';

$(document).ready(function() {
  let dc = new displayController();
  let cgame = dc.gamesetup();

  $('body').contextmenu(function(e) {
      e.preventDefault();
  });

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