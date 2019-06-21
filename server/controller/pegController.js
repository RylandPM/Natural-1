module.exports = {
  getPegs: (req, res, next) => {
    const { game_name } = req.params;
    console.log(game_name);
    const db = req.app.get("db");
    db.get_pegs(game_name).then(pegs => {
      res.status(200).send(pegs);
    });
  },
  postPeg: (req, res, next) => {
    console.log(req.body);
    const { peg_name, xpos, ypos, monster, game_id } = req.body;
    const db = req.app.get("db");
    db.post_peg(peg_name, xpos, ypos, monster, game_id).then(() => {
      res.status(200).send("posted");
    });
  },
  movePeg: (req, res, next) => {
    console.log(req.body);
    const { peg_name, xpos, ypos } = req.body;
    const db = req.app.get("db");
    db.move_peg(xpos, ypos, peg_name).then(() => {
      res.status(200).send("moved");
    });
  },
  deletePeg: (req, res, next) => {
    const { peg_name } = req.params;
    const db = req.app.get("db");
    db.delete_peg(peg_name).then(() => {
      res.status(200).send("deleted");
    });
  }
};
