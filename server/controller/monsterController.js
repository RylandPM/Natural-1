module.exports = {
  getMonsters: (req, res, next) => {
    const db = req.app.get("db");
    db.get_monsters().then(monsters => {
      req.status(200).send(monsters);
    });
  },
  postMonster: (req, res, next) => {
    const { monster_name, monster_health } = req.body;
    const db = req.app.get("db");
    db.post_monster(monster_name, monster_health).then(monsters => {
      res.status(200).send(monsters);
    });
  },
  updateMonster: (req, res, next) => {
    const { monster_name, monster_health } = req.body;
    const { id } = req.params;
    const db = req.app.get("db");
    db.update_monster(monster_name, monster_health, id).then(monsters => {
      res.status(200).send(monsters);
    });
  },
  deleteMonster: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.delete_monster(id).then(monsters => {
      res.status(200).send(monsters);
    });
  }
};
