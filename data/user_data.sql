CREATE TABLE user_data(
    id serial,
    name text UNIQUE,
    email text UNIQUE,
    password text UNIQUE
)