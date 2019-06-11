update monster
set monster_name = $1,
monster_health = $2
where monster_id = $3;

select *
from monster;