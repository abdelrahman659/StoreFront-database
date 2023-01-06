/* Replace with your SQL commands */
CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(250) NOT NULL,
    firstName VARCHAR(250)NOT NULL,
    lastName VARCHAR(250)NOT NULL,
    password VARCHAR(250)NOT NULL
);