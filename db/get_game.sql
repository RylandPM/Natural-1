select game_name, gm, user_id
from game
where game_name = $1;