import dotenv from 'dotenv';

dotenv.config();
// show the env Vriable
console.log(process.env)
const {PORT,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_DB_TEST,
    POSTGRES_PASSWORD,
    ENV,
    BCRIPT_PASSWORD,
    SALT_ROUNDS,
    TOKEN_KEY
} = process.env;

export default{
    port: PORT,
    host:POSTGRES_HOST,
    dbPort: POSTGRES_PORT,
    database: POSTGRES_DB,
    databasetest:POSTGRES_DB_TEST,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
    pepper:BCRIPT_PASSWORD,
    salt: SALT_ROUNDS,
    token:TOKEN_KEY,
}