module.exports = {
  getGame: (req, res, next) => {
    const { game_name } = req.params;
    const db = req.app.get("db");
    db.get_game(game_name).then(game => {
      res.status(200).send(game);
    });
  },
  postGame: (req, res, next) => {
    const { game_name, gm } = req.body;
    const db = req.app.get("db");
    db.post_game(game_name, parseInt(gm)).then(game => {
      res.status(200).send(game);
    });
  },
  joinGame: (req, res, next) => {
    const { game_name } = req.params;
    const { user_id } = req.body;
    const db = req.app.get("db");
    db.get_game(game_name).then(game =>
      db.join_game(game_name, game[0].gm, user_id).then(game => {
        res.status(200).send(game);
      })
    );
  }
};
