import game from './controllers/game.js';

let main = {
    methods: {
      gamesetup: function() {
        $('.gamecell').attr('chess', 'null');
        let ex_game = new game();
        
        for (let gamepiece of ex_game.player1.pieces) {
          let loc = gamepiece.loc[0] + gamepiece.loc[1];
          // Create an <img> element and set its src attribute to the filepath
          let imgElement = $('<img>').attr('src', gamepiece.img)

          $('#' + loc).html(imgElement);
          $('#' + loc).attr('chess', gamepiece.pc_id);
        }
        for (let gp of ex_game.player2.pieces) {
          let loc = gp.loc[0] + gp.loc[1];
          // Create an <img> element and set its src attribute to the filepath
          let imgElement = $('<img>').attr('src', gp.img)

          $('#' + loc).html(imgElement);
          $('#' + loc).attr('chess', gp.pc_id);
        }
      }
    }
}

$(document).ready(function() {
    main.methods.gamesetup();

    $('body').contextmenu(function(e) {
        e.preventDefault();
      });
});