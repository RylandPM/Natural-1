require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
app.use(express.json());

const { login, register, currentUser } = require("./controller/authController");
// const {
//   getMessages,
//   postMessage,
//   updateMessage,
//   deleteMessage
// } = require("./controller/messageController");
// const {
//   getCurrentCharacter,
//   getUserCharacters,
//   getGameCharacters,
//   createNewCharacter,
//   updateCharacter,
//   deleteCharacter
// } = require("./controller/charController");
// const { getUserGames, getGame } = require("./controller/gameController");
// const {
//   getMonsters,
//   postMonster,
//   updateMonster,
//   deleteMonster
// } = require("./controller/monsterController");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(
  session({
    saveUninitialized: false,
    secret: SESSION_SECRET,
    resave: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db is connected");
});

// auth endpoints
app.get("/auth/user", currentUser);
app.post("/auth/register", register);
app.post("/auth/login", login);

// message endpoints

// character endpoints

// monster endpoints

// game endpoints

const port = SERVER_PORT || 4000;

app.listen(port, () => console.log(`server running on ${port}`));
