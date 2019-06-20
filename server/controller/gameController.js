module.exports = {
  getGame: (req, res, next) => {
    const { game_name } = req.params;
    const db = req.app.get("db");
    db.get_game(game_name).then(game => {
      res.status(200).send(game);
    });
  },
  postGame: (req, res, next) => {
    const { gamename, gm } = req.body;
    // console.log(req.body);
    const db = req.app.get("db");
    console.log("post game hit", gamename, gm);
    db.post_game(gamename, gm)
      .then(game => {
        res.status(200).send(game);
      })
      .catch(err => console.log(err));
  },
  joinGame: (req, res, next) => {
    const { game_name } = req.params;
    const { user_id } = req.body;
    const db = req.app.get("db");
    console.log("hit join game", game_name);
    db.get_game(game_name)
      .then(game => {
        console.log(game);
        db.join_game([game_name, game[0].gm, user_id]).then(gam => {
          res.status(200).send(gam);
        });
      })
      .catch(err => console.log(err));
  }
};
