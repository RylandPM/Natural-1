module.exports = {
  getCurrentCharacter: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.get_character(id).then(character => {
      res.status(200).send(character);
    });
  },
  getUserCharacters: (req, res, next) => {
    const { user_id } = req.query;
    const db = req.app.get("db");
    db.get_user_characters(user_id).then(characters => {
      res.status(200).send(characters);
    });
  },
  createNewCharacter: (req, res, next) => {
    const {
      char_name,
      classes,
      lvl,
      health,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
      user_id
    } = req.body;
    const db = req.app.get("db");
    db.create_character(
      char_name,
      classes,
      lvl,
      health,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
      user_id
    ).then(characters => {
      res.status(200).send(characters);
    });
  },
  updateCharacter: (req, res, next) => {
    const {
      char_name,
      classes,
      lvl,
      health,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
      character_id,
      user_id
    } = req.body;
    const db = req.app.get("db");
    db.update_character(
      char_name,
      classes,
      lvl,
      health,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
      character_id,
      user_id
    ).then(characters => {
      res.status(200).send(characters);
    });
  },
  deleteCharacter: (req, res, next) => {
    const { user_id } = req.body;
    const { id } = req.params;
    const db = req.app.get("db");
    db.delete_character(id, user_id).then(characters => {
      res.status(200).send(characters);
    });
  }
};
