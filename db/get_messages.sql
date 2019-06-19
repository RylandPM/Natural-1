select username, message, message_id
from users
    join message on (users.user_id = message.user_id)
    join game on (users.user_id = game.user_id)
where game_name = $1
order by time_entered ASC;