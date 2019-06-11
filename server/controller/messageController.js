module.exports = {
  getMessages: (req, res, next) => {
    const { user_id } = req.body.players;
    const db = req.app.get("db");
    db.get_messages().then(messages => {
      res.status(200).send(messages);
    });
  },
  postMessages: (req, res, next) => {
    const { message } = req.body;
    const db = req.app.get("db");
    db.post_message(message).then(messages => {
      res.status(200).send(messages);
    });
  },
  updateMessage: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.update_message(id).then(messages => {
      res.status(200).send(messages);
    });
  },
  deleteMessage: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.delete_message(id).then(messages => {
      res.status(200).send(messages);
    });
  }
};
