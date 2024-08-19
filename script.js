import game from './controllers/game.js';
import displayController from './controllers/displayController.js';

$(document).ready(function() {
  
  const chessboard = $('#gameboard');
  for (let i = 63; i >= 0; i--) {
    const row = Math.floor(i / 8);
    const col = 8 - (i % 8);
    const id = row * 8 + col - 1;
    const cell = $('<div></div>').addClass('gamecell').attr('id', id);
    if ((i + row) % 2 === 0) cell.addClass('dark');

    chessboard.append(cell);
  }

  $('body').contextmenu(function (e) {
    e.preventDefault();
  });

  let dc = new displayController();

  // Set selected piece and show available moves when piece clicked
  $('.gamecell').on('click', '.chess-piece',function() {
    
    if (dc.getPieceAt($(this.closest('.gamecell'))).getColor() === dc._game.getPlayer().color){
      dc.clearDots();
      dc.pieceSelected($(this.closest('.gamecell')));
    }
    else {
      dc.updateLocation($(this.closest('.gamecell')));
    }
  });

  $('.gamecell').on('click', '.moveoption', function() {
    dc.updateLocation($(this.closest('.gamecell')));
  });

});