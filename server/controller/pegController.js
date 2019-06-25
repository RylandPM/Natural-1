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
    const { peg_name, xpos, ypos, monster, game_id, game_name } = req.body;
    const db = req.app.get("db");
    db.check_if_occupied(xpos, ypos, game_name).then(resp => {
      if (resp.length > 0) {
        console.log("Please empty first square");
      } else {
        console.log(req.body);
        db.post_peg(peg_name, xpos, ypos, monster, game_id).then(() => {
          res.status(200).send("posted");
        });
      }
    });
  },
  movePeg: (req, res, next) => {
    console.log("move peg", req.body);
    const { peg_name, xpos, ypos, game_name } = req.body;
    console.log(game_name);
    const db = req.app.get("db");
    db.check_if_occupied(xpos, ypos, game_name)
      .then(resp => {
        // console.log("move peg hit ", resp);
        if (resp.length > 0) {
          console.log("Please move any occupying pieces before moving here");
        } else {
          db.move_peg(xpos, ypos, peg_name).then(() => {
            res.status(200).send("moved");
          });
        }
      })
      .catch(err => console.log(`Error occured`, err));
  },
  deletePeg: (req, res, next) => {
    const { peg_name } = req.params;
    const db = req.app.get("db");
    db.delete_peg(peg_name).then(() => {
      res.status(200).send("deleted");
    });
  }
};
