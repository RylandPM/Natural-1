# Critical Fail App.com/Crit?status=fail

## frontend

### dependencies

- axios
- react-redux
- redux
- react-router-dom (BrowserRouter)
- react-iconts/fa
- http-proxy-middleware
- react-dom
- react-dnd
- react-dnd-html5-backend

### file-structure

- src/
  - components/
    - Header/
      - Header.js
      - Header.css
    - Dashboard/
      - Dashboard.js
      - Dashboard.css
    - MessageDisplay/
      - MessageDisplay.js
      - MessageDisplay.css
    - GameBoard/
      - Squares/
        - Squares.css
        - Squares.js
      - Pegs/
        - Pegs.js
        - Pegs.css
      - GameBoard.js
      - GameBoard.css
    - CharacterEditor/
      - CharacterEditor.js
      - CharacterEditor.css
    - Login/
      - Register/
        - Register.js
        - Register.css
      - Login.js
      - Login.css
    - MonsterMaker/
      - MonsterMaker.js
      - MonsterMaker.css
  - App.js
  - index.js
  - reset.css
  - dux/
    - store.js
    - gameReducer.js
    - charReducer.js
    - userReducer.js

## Routes

- Home => /
- Board => /board
- MonsterMaker => /monstermaker
- CharacterCreation => /charactercreation
- catchAll => '\*'

## Redux State

```js
const initialState = {
  user: null,
  messages: [],
  players: [],
  monsters: []
};
```

## backend

### dependencies

- express
- massive
- dotenv
- express-session
- bcrypt

### folder structure

- server/
  - index.js
  - controller/
    - messageController
    - authController
    - charController
    - gameController
    - monsterController

### endpoint routes

**auth**

- login => /auth/login
- register: => /auth/register

**message**

- getMessages: => /api/messages
- postMessages: => /api/messages
- updateMessages: => /api/messages/:id
- deleteMessage: => /api/messages/:id

**characters**

- getCurrentCharacter: => /api/characters/:id
- getUserCharacters: => /api/characters?user_id=id
- createNewCharacter: => /api/characters
- updateCharacter: => /api/characters/:id
- deleteCharacter: => /api/character/:id

**game**

- getGame: => /api/game/:id
- postGame: => /api/game
- joinGame: => /api/game/:name

**monster**

- getMonsters: => /api/monster
- postMonster: => /api/monster
- updateMonster: => /api/monster/:id
- deleteMonster: => /api/monster/:id

### database

- users

```sql
create table user (
    user_id serial primary key,
    username varchat(40) not null,
    password text not null,
    email text not null
)
```

- messages

```sql
create table message (
    message_id serial primary key,
    message text not null,
    user_id int references user(user_id),
    time_entered date default now(),
    FOREIGN KEY(user_id) references user(user_id)
)
```

- characters

```sql
create table characters (
    character_id serial primary key,
    char_name varchar(40) not null,
    classes text not null,
    lvl int not null,
    strength int not null,
    dexterity int not null,
    constitution int not null,
    intelligence int not null,
    wisdom int not null,
    charisma int not null,
    user_id int references user(user_id),
    FOREIGN KEY(user_id) references user(user_id)
)
```

- games

```sql
create table game (
    game_id serial primary key,
    game_name varchar(40) not null,
    user_id int references user(user_id),
    gm int not null
)
```

- monsters

```sql
create table monster (
    monster_id serial primary key,
    monster_name varchar(30) not null,
    monster_health int not null
)
```

-- npcs(reach goal)

-- shops(reach goal)

### dotenv

```text
SESSION_SECRET=
SERVER_PORT=
CONNECTION_STRING=
```
