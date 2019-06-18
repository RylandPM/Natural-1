select char_name,
    classes,
    lvl,
    health,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    character_id
from characters
where user_id = $1;