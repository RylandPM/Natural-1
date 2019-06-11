update message
set message = $2
where message_id = $1;

select username, message
from users
    join message on (users.user_id = message.user_id)
    join game on (users.user_id = game.user_id)
where game_name = $3
order by time_entered ASC;