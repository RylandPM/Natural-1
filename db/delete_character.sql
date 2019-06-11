delete from characters where character_id = $1;

select char_name,
    classes,
    lvl,
    health,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma
from characters
where user_id = $2;