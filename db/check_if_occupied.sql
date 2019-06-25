select peg_name
from peg join game
    on (peg.game_id = game.game_id)
where xpos = $1 AND ypos = $2 AND game_name = $3;