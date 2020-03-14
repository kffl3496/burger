CREATE DATABASE IF NOT EXISTS burgers_db;

USE burgers_db;

DROP TABLE IF EXISTS burgers;

CREATE TABLE burgers (
	id int auto_increment,
    primary key (id),
    burger_name VARCHAR(30) NOT NULL,
	devoured BOOLEAN
);


-- INSERT INTO burgers (burger_name, devoured)
-- VALUES ('bacon burger', true);

-- INSERT INTO burgers (burger_name, devoured)
-- VALUES ('veggie burger', false);

-- INSERT INTO burgers (burger_name, devoured)
-- VALUES ('cheeseburger', true);
