module.exports = {
  getMessages: (req, res, next) => {
    const { game_name } = req.body;
    const db = req.app.get("db");
    db.get_messages(game_name).then(messages => {
      res.status(200).send(messages);
    });
  },
  postMessages: (req, res, next) => {
    const { message, user_id, game_name } = req.body;
    const db = req.app.get("db");
    db.post_message(message, user_id, game_name).then(messages => {
      res.status(200).send(messages);
    });
  },
  updateMessage: (req, res, next) => {
    const { message, game_name } = req.body;
    const { id } = req.params;
    const db = req.app.get("db");
    db.update_message(parseInt(id), message, game_name).then(messages => {
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
