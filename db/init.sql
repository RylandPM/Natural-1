drop table if exists message;
drop table if exists characters;
drop table if exists game;
drop table if exists monster;
drop table if exists users;

create table users
(
    user_id serial primary key,
    username varchar(40) not null,
    password text not null,
    email text not null
);

insert into users
    (username, password, email)
values
    ('testboi', 'testing123', 'testing@test.test.io.xyz');

create table message
(
    message_id serial primary key,
    message text not null,
    user_id int references users(user_id),
    time_entered date default now(),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

insert into message
    ( message, user_id)
values
    ('this is a test', 1);

create table characters
(
    character_id serial primary key,
    char_name varchar(40) not null,
    classes text not null,
    lvl int not null,
    health int not null,
    strength int not null,
    dexterity int not null,
    constitution int not null,
    intelligence int not null,
    wisdom int not null,
    charisma int not null,
    user_id int references users(user_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

insert into characters
    (char_name, classes, lvl, health, strength, dexterity, constitution, intelligence, wisdom, charisma, user_id)
values
    ('Generic Man', 'fighter', 1, 11, 12, 11, 12, 10, 10, 10, 1);


create table game
(
    game_id serial primary key,
    game_name varchar(40) not null,
    user_id int REFERENCES users(user_id),
    gm int not null
);

insert into game
    (game_name, user_id, gm)
values
    ('this is just a test', 1, 1);

create table monster
(
    monster_id serial primary key,
    monster_name varchar(30) not null,
    monster_health int not null
);

create table peg
(
    peg_id serial primary key,
    peg_name text not null,
    xpos int not null,
    ypos int not null,
    monster bool not null,
    game_id int references game(game_id)
);

insert into peg
    (peg_name, xpos, ypos, monster, game_id)
values
    ('PepsiMan', 0, 0, false, 36);

insert into monster
    (monster_name, monster_health)
values
    ('Jim from Accounting', 999);

insert into users
    (username, password, email)
values
    ('Basically Batman', 'batman', 'notactuallybatman@batman.robin');

insert into message
    (message, user_id)
values
    ('Im Batman', 2);

insert into characters
    (char_name, classes, lvl, health, strength, dexterity, constitution, intelligence, wisdom, charisma, user_id)
values
    ('Batman', 'rogue', 1, 8, 10, 18, 12, 16, 9, 10, 2);

insert into game
    (game_name, user_id, gm)
values
    ('this is just a test', 2, 1);

insert into game
    (game_name, user_id, gm)
values
    ('the edgiest thing since Dark Souls', 2, 2);

insert into monster
    (monster_name, monster_health)
values
    ('baby with a gun', 5);