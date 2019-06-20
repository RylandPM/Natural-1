require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
const server = require("http").Server(app);
const io = require("socket.io")(server);
app.use(express.json());

const { login, register, currentUser } = require("./controller/authController");
const {
  getMessages,
  postMessages,
  updateMessage,
  deleteMessage
} = require("./controller/messageController");
const {
  getUserCharacters,
  getCurrentCharacter,
  createNewCharacter,
  updateCharacter,
  deleteCharacter
} = require("./controller/charController");
const { getGame, postGame, joinGame } = require("./controller/gameController");
const {
  getMonsters,
  postMonster,
  updateMonster,
  deleteMonster
} = require("./controller/monsterController");
const {
  getPegs,
  postPeg,
  movePeg,
  deletePeg
} = require("./controller/pegController");

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

io.sockets.on("connection", socket => {
  socket.join("Home");
  socket.on("update", message => {
    console.log("update hit");
    io.emit("message");
  });
  socket.on("board", change => {
    io.emit("rebuild");
  });
});

// auth endpoints
app.get("/auth/user", currentUser);
app.post("/auth/register", register);
app.post("/auth/login", login);

// message endpoints
app.get("/api/messages", getMessages);
app.post("/api/messages", postMessages);
app.put("/api/messages/:id", updateMessage);
app.delete("/api/messages/:id", deleteMessage);

// character endpoints
app.get("/api/characters/:id", getCurrentCharacter);
app.get("/api/characters", getUserCharacters);
app.post("/api/characters", createNewCharacter);
app.put("/api/characters/:id", updateCharacter);
app.delete("/api/characters/:id", deleteCharacter);

// monster endpoints
app.get("/api/monsters", getMonsters);
app.post("/api/monsters", postMonster);
app.put("/api/monsters/:id", updateMonster);
app.delete("/api/monsters/:id", deleteMonster);

// game endpoints
app.get("/api/game/:game_name", getGame);
app.post("/api/game", postGame);
app.post("/api/game/:game_name", joinGame);

// peg endpoints
app.get("/api/peg/:game_name", getPegs);
app.post("/api/peg", postPeg);
app.put("/api/peg", movePeg);
app.delete("/api/peg/:game_name", deletePeg);

const port = SERVER_PORT || 4000;

server.listen(port, () => console.log(`server running on ${port}`));
