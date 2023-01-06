# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index [token required] (GET /api/product)
- Show [token required](GET /api/product/:id)
- Create [token required] (POST /api/product)
- Update [token required] (Patch /api/product/:id)
- Delete [token required] (Delete /api/product/:id)

#### Users

- Index [token required] (GET /api/user)
- Show [token required] (GET /api/user/:id)
- Create (POST /api/user)
- Update [token required] (Patch /api/user/:id)
- Delete [token required] (Delete /api/user/:id)

#### Orders

- Index [token required] (GET /api/order)
- Show [token required] (GET /api/order/:id)
- Create [token required] (POST /api/order)
- Update [token required] (Patch /api/order/:id)
- Delete [token required] (Delete /api/order/:id)

## Data Shapes

#### Product

- id
- name
- price

# Product Schema :

CREATE TABLE products(
id SERIAL PRIMARY KEY,
productName VARCHAR(100)NOT NULL,
price integer NOT NULL
);

#### User

- id
- username
- firstName
- lastName
- password

# User Schema :

CREATE TABLE Users(
id SERIAL PRIMARY KEY,
username VARCHAR(250) NOT NULL,
firstName VARCHAR(250)NOT NULL,
lastName VARCHAR(250)NOT NULL,
password VARCHAR(250)NOT NULL
);

#### Orders

- id
- user_id
- status of order (active or complete)

# Order Schema :

CREATE TABLE orders(
id SERIAL PRIMARY KEY,
user_id BIGINT REFERENCES Users(id) NOT Null,
status VARCHAR(50) NOT NULL
);

## order_products

- id
- order_id
- product_id
- quantity

# order_products Schema :

CREATE TABLE order_products(
id SERIAL PRIMARY KEY,
order_id BIGINT REFERENCES orders(id) NOT NULL,
product_id BIGINT REFERENCES products(id) NOT NULL,
quantity integer NOT NULL
);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////************\*\*\*************////////////**\*\*\*\***////////////******\*\*\*******/////////////////////********\*\*********///////////////////**\*\*\***
