drop table if exists users;
drop table if exists message;
drop table if exists characters;
drop table if exists game;
drop table if exists monster;

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
    monsterpack_id serial,
    user_id int REFERENCES users(user_id)
);

insert into game
    (game_name)
values
    ('this is just a test');

create table monster
(
    monster_id serial primary key,
    monster_name varchar(30) not null,
    monster_health int not null
);

insert into monster
    (monster_name, monster_health)
values
    ('Jim from Accounting', 999);
