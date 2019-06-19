module.exports = {
  getMessages: (req, res, next) => {
    console.log(req.query);
    const { game_name } = req.query;
    const db = req.app.get("db");
    db.get_messages(game_name).then(messages => {
      res.status(200).send(messages);
    });
  },
  postMessages: (req, res, next) => {
    console.log(req.body);
    const { newmessage, user_id, game_name } = req.body;
    const db = req.app.get("db");
    db.post_message(newmessage, user_id, game_name).then(messages => {
      res.status(200).send(messages);
    });
  },
  updateMessage: (req, res, next) => {
    const { newmessage, game_name } = req.body;
    const { id } = req.params;
    const db = req.app.get("db");
    db.update_message(id, newmessage, game_name).then(messages => {
      res.status(200).send(messages);
    });
  },
  deleteMessage: (req, res, next) => {
    const { game_name } = req.body;
    const { id } = req.params;
    const db = req.app.get("db");
    db.delete_message(parseInt(id), game_name).then(messages => {
      res.status(200).send(messages);
    });
  }
};
