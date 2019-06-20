select peg_name, xpos, ypos, monster
from peg
    join game on (peg.game_id = game.game_id)
where game_name = $1
order by xpos + (ypos * 10) ASC;