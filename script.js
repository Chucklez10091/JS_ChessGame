import game from './controllers/game.js';

let main = {
    methods: {
      gamesetup: function() {
        $('.gamecell').attr('chess', 'null');
        let ex_game = new game();
        
        // Loop through player 1 pieces
        for (let gamepiece of ex_game.player1.pieces) {
          let loc = gamepiece.loc;

          $('#' + loc).html(gamepiece.divInfo);
          $('#' + loc).attr('chess', gamepiece.pc_id);
        }

        // loop through player 2 pieces
        for (let gamepiece of ex_game.player2.pieces) {
          let loc = gamepiece.loc[0] + gamepiece.loc[1];

          $('#' + loc).html(gamepiece.divInfo);
          $('#' + loc).attr('chess', gamepiece.pc_id);
        }
        ex_game.start();
        return ex_game;
      },

      addDots: function(cellstoadd) {
        
        for (let cellId of cellstoadd){
          const cell = document.getElementById(cellId);
          if (cell) {
            const dot = document.createElement('div');
            dot.classList.add('moveoption', 'dot');
            cell.appendChild(dot);
          }
        }
      },

      clearDots: function() {
        const elements = document.querySelectorAll(`.moveoption`);
  
        // Loop through the selected elements and remove the class
        elements.forEach(element => {
          element.classList.remove('moveoption','dot');
        });
      }
    }
}

$(document).ready(function() {
    let cgame = main.methods.gamesetup();

    $('body').contextmenu(function(e) {
        e.preventDefault();
    });

    $('.chess-piece').on('click', function() {
      console.log('Piece clicked: ' + $(this).data('piece'));
      cgame.clearSelected();
      main.methods.clearDots();

      let currpiece = cgame.getPlayer().getPiece($(this).data('piece'));
      cgame.setSelected(currpiece);
      currpiece.updateOptions(cgame.board);
      
      main.methods.addDots(currpiece.can_move);
    });

    $('.moveoption').on('click', function(){
      console.log('moveoption clicked');
      let target_space = $(this).closest('.gamecell').attr('id');
      console.log(target_space);
      cgame.selectedpiece.move(target_space);
    });

});