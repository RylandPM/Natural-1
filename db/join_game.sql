insert into game
    (game_name, gm, user_id)
values
    ($1, $2, $3);

select game_name, gm, user_id
from game
where game_name = $1;