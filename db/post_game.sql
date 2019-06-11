insert into game
    (game_name, gm, user_id)
values
    ($1, $2, $2);

select game_name
from game;