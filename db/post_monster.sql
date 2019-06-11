insert into monster
    (monster_name, monster_health)
values
    ($1, $2);

select *
from monster;