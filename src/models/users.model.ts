import bcrypt from 'bcrypt';
import db from '../database';
import User from '../types/user.type';
import config from '../config';
// Hashing user Password using Salt and Pepper
const hashPassword=(password:string)=>{
    const salt = parseInt(config.salt as string,10);
    return bcrypt.hashSync(`${password}${config.pepper}`,salt)
}

class UserModel{
    // create user And Insert this user to users table
    async create(user:User):Promise<User>{
        try{
            const dbconn = await db.connect();
            const sql = `INSERT INTO Users(username,firstName,lastName,password)
            VALUES ($1,$2,$3,$4) RETURNING id,username,firstName,lastName`;

            const result = await dbconn.query(sql,[
                user.username,
                user.firstName,
                user.lastName,
                hashPassword(user.password as string)
            ]);

            dbconn.release();
            return result.rows[0];

        }catch(err){
            throw new Error( `Unable to create (${user.username}): ${(err as Error).message}`)
        }
    }
// get All users from users Table
    async getAllUsers():Promise<User[]>{
        try{
            const dbconn = await db.connect();
            const sql = 'SELECT id,username,firstName,lastName FROM Users';
            const result = await dbconn.query(sql);
            dbconn.release();

            return result.rows;
 
        }catch(err){
            throw new Error(`Can not retrieving All users ${(err as Error).message}`)
        }
    }
// Get spicifec user By id
    async getOne(id:number):Promise<User>{
        try{
            const sql = `SELECT id,username,firstName,lastName FROM Users
            WHERE id=($1)`;
            const dbconn = await db.connect();
            const result = await dbconn.query(sql,[id]);

            dbconn.release();
            return result.rows[0];

        }catch(err){
            throw new Error(`Could not find user ${id}, ${(err as Error).message}`)
        }
    }
    // update one user by ID
    async updateOneUser(user:User):Promise<User>{
        try{
            const dbconn = await db.connect();
            const sql = `UPDATE Users
            SET username=$1,firstName=$2,lastName=$3,password=$4
            WHERE id=$5
            RETURNING id,username,firstName,lastName`;

            const result = await dbconn.query(sql,[
                user.username,
                user.firstName,
                user.lastName,
                hashPassword(user.password as string),
                user.id,
            ]);

            dbconn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Could not update user: 
            ${user.username}, ${(err as Error).message}`)
        }
    }
    // Delete one user by ID
    async deleteUser(id:number):Promise<User>{
        try{
            const dbconn = await db.connect();
            const sql = `DELETE FROM Users
            WHERE id=($1)
            RETURNING id,username,firstName,lastName`;
            const result = await dbconn.query(sql,[id]);
            dbconn.release();

            return result.rows[0];

        }catch(err){
            throw new Error(`Could not delete user ${id} , ${(err as Error).message}`)
        }
    }
    // check if user is Authorized or Not 
async authUser(username:string,password:string):Promise<User | undefined>{
    try{
        const dbconn = await db.connect();
        const sql = 'SELECT password FROM Users WHERE username=$1';
        const result = await dbconn.query(sql,[username]);
        
        if(result.rows.length){
            const {password:hashPassword}=result.rows[0];
            //
            const valid = bcrypt.compareSync(
                `${password}${config.pepper}`,
                hashPassword
            );
            if(valid){
                const user = await dbconn.query(
                    'SELECT id,username,firstName,lastName FROM Users WHERE username=($1)',
                    [username]);
                    return user.rows[0];
            }
        }
        dbconn.release();
        return undefined;
    }catch(err){
        throw new Error(`You are not Authorized : ${err}`)

    }
}

}
export default UserModel;