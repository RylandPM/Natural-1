insert into characters
    (char_name, classes, lvl, health, strength, dexterity, constitution, intelligence, wisdom, charisma, user_id)
values
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);

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
where user_id = $11;