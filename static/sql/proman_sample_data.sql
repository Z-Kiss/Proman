--
-- PostgreSQL database Proman
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET default_tablespace = '';

SET default_with_oids = false;

---
--- drop tables
---

DROP TABLE IF EXISTS statuses CASCADE;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS columns CASCADE;

---
--- create tables
---

CREATE TABLE statuses
(
    id    SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(200)       NOT NULL,
    color VARCHAR(200)       NOT NULL
);

CREATE TABLE boards
(
    id    SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(200)       NOT NULL
);

CREATE TABLE cards
(
    id         SERIAL PRIMARY KEY NOT NULL,
    board_id   INTEGER            NOT NULL,
    status_id  INTEGER            NOT NULL,
    title      VARCHAR(200)       NOT NULL,
    card_order INTEGER            NOT NULL
);
CREATE TABLE columns
(
    id           SERIAL PRIMARY KEY NOT NULL,
    board_id     INTEGER            NOT NULL,
    status_id    SERIAL             NOT NULL,
    column_order INTEGER            NOT NULL
);

CREATE TABLE user_data(
    id serial,
    name text UNIQUE,
    email text UNIQUE,
    password text UNIQUE
);
---
--- insert data
---

INSERT INTO statuses(title, color)
VALUES ('new', '#590000');
INSERT INTO statuses(title, color)
VALUES ('in progress', '#594300');
INSERT INTO statuses(title, color)
VALUES ('testing', '#525900');
INSERT INTO statuses(title, color)
VALUES ('done', '#085900');
INSERT INTO statuses(title, color)
VALUES ('new', '#590000');
INSERT INTO statuses(title, color)
VALUES ('in progress', '#594300');
INSERT INTO statuses(title, color)
VALUES ('testing', '#525900');
INSERT INTO statuses(title, color)
VALUES ('done', '#085900');


INSERT INTO boards(title)
VALUES ('Board 1');
INSERT INTO boards(title)
VALUES ('Board 2');

INSERT INTO cards
VALUES (nextval('cards_id_seq'), 1, 1, 'new card 1', 1);
INSERT INTO cards
VALUES (nextval('cards_id_seq'), 1, 1, 'new card 2', 2);
INSERT INTO cards
VALUES (nextval('cards_id_seq'), 1, 2, 'in progress card', 1);
INSERT INTO cards
VALUES (nextval('cards_id_seq'), 1, 3, 'planning', 1);
INSERT INTO cards
VALUES (nextval('cards_id_seq'), 1, 4, 'done card 1', 1);
INSERT INTO cards
VALUES (nextval('cards_id_seq'), 1, 4, 'done card 1', 2);
INSERT INTO cards
VALUES (nextval('cards_id_seq'), 2, 5, 'new card 1', 1);
INSERT INTO cards
VALUES (nextval('cards_id_seq'), 2, 5, 'new card 2', 2);
INSERT INTO cards
VALUES (nextval('cards_id_seq'), 2, 6, 'in progress card', 1);
INSERT INTO cards
VALUES (nextval('cards_id_seq'), 2, 7, 'planning', 1);
INSERT INTO cards
VALUES (nextval('cards_id_seq'), 2, 8, 'done card 1', 1);
INSERT INTO cards
VALUES (nextval('cards_id_seq'), 2, 8, 'done card 1', 2);

INSERT INTO columns
VALUES (nextval('columns_id_seq'), 1, 1, 1);
INSERT INTO columns
VALUES (nextval('columns_id_seq'), 1, 2, 2);
INSERT INTO columns
VALUES (nextval('columns_id_seq'), 1, 3, 3);
INSERT INTO columns
VALUES (nextval('columns_id_seq'), 1, 4, 4);
INSERT INTO columns
VALUES (nextval('columns_id_seq'), 2, 5, 1);
INSERT INTO columns
VALUES (nextval('columns_id_seq'), 2, 6, 2);
INSERT INTO columns
VALUES (nextval('columns_id_seq'), 2, 7, 3);
INSERT INTO columns
VALUES (nextval('columns_id_seq'), 2, 8, 4);

---
--- add constraints
---

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_board_id FOREIGN KEY (board_id) REFERENCES boards (id) ON DELETE CASCADE;

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_status_id FOREIGN KEY (status_id) REFERENCES statuses (id);

