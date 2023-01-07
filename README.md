# Storefront backend

##Getting Started
This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run npm in your terminal at the project root.
Before We start you need to Follw this Steps :=>
# Required Technologies
1- To Install Node Backages run : npm install .
2- To run nodemon & build : npm run start

3- To run jasmine & build : npm run test

4- To run Server : npm run dev

/////////////////////////////////////////////

# All API Routes in the router Folder

///////////////////////////////////////////

# Migrations :

\*First of all install Migration:
(npm i db-migrate db-migrate-pg)
1- To create migrate you need to run : npx db-migrate create products-table --sql-file .

2- To Add This Table to your PG Database : npm run migration
this do db-migrate up

3- To take step back using migration : npx db-migrate down .

**\*\***\*\*\*\***\*\***\*\*\*\***\*\***\*\*\*\***\*\***\*\*\***\*\***\*\*\*\***\*\***\*\*\*\***\*\***\*\*\*\***\*\***
