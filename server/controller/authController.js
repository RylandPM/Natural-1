const bcrypt = require("bcrypt");

module.exports = {
  login: (req, res, next) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    db.check_if_user_exists(username).then(userFound => {
      if (!userFound[0]) {
        res.status(401).send("Incorrect username/password");
      } else {
        bcrypt
          .compare(password, userFound[0].password)
          .then(matchedPassword => {
            if (matchedPassword) {
              const { username, email, user_id } = userFound[0];
              req.session.user = { username, email, user_id };
              res.status(200).send(req.session.user);
            } else {
              res.status(401).send("Incorrect username/password");
            }
          });
      }
    });
  },
  register: (req, res, next) => {
    const { username, email, password } = req.body;
    const db = req.app.get("db");
    db.check_if_user_exists(username).then(foundUser => {
      if (foundUser.length) {
        res.status(401).send("Username already exists.");
      } else {
        const saltRounds = 12;
        bcrypt.genSalt(saltRounds).then(salt => {
          bcrypt.hash(password, salt).then(hashedPassword => {
            db.register([username, hashedPassword, email]).then(createdUser => {
              req.session.user = createdUser[0];
              res.status(200).send(req.session.user);
            });
          });
        });
      }
    });
  },
  currentUser: (req, res, next) => {
    res.status(200).send(req.session.user);
  }
};
