/* Replace with your SQL commands */

CREATE TABLE orders(
     id SERIAL PRIMARY KEY,
     user_id BIGINT REFERENCES Users(id) NOT Null,
     status VARCHAR(50) NOT NULL
);