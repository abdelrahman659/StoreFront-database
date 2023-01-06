import supertest from "supertest";
import app from "../../server";
import db from '../../database';
import UserModel from "../../models/users.model";
import User from "../../types/user.type";

const userModel = new UserModel();
const Request = supertest(app);

let token :string = '';

describe('Testing User Routes',()=>{
    beforeAll(async()=>{
        const user={
            username:"MohamedAli ",
            firstName:"Mohamed ",
            lastName:"Ali ",
            password:"1234"
        } as User
        await userModel.create(user);
    });

    afterAll(async()=>{
        // After testing clean this database
        // start agin with id=1
        const dbconn = await db.connect();
        const sql =`DELETE FORM Users;
        \nAlter SEQUENCE user_id_seq RESTART WITH 1`;
        await dbconn.query(sql);
        dbconn.release();
    });

    describe('Test Authenticate API',()=>{
        it('expect to return Token if user is authenticated  ',async()=>{
            const res = await Request
            .post('/api/user/authenticate')
            .set('Content-type', 'application/json')
            .send({
                username:"MohamedAli ",
            password:"1234"
            });
            expect(res.status).toEqual(200);
            const {id,username,token:userToken} = res.body.data;
            expect(id).toBe(1);
            expect(username).toBe('MohamedAli');
            token = userToken;
        });
    });

    describe('Testing All User Routes',()=>{
        it('expect to create new Usre',async()=>{
            const res = await Request
            .post('/api/user')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username:"MohamedAli ",
            firstName:"Mohamed ",
            lastName:"Ali ",
            password:"1234"
        });
        expect(res.status).toBe(200);
        const { id, username, firstName, lastName } = res.body.data;
        expect(id).toBe(1);
      expect(username).toBe('MohamedAli');
      expect(firstName).toBe('Mohamed');
      expect(lastName).toBe('Ali');
        });

        it('expect to get All users', async () => {
            Request
            .get('/api/user')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', 'application/json')
            .expect([
                {
                    id: 1,
                    username:"MohamedAli ",
                firstName:"Mohamed ",
                lastName:"Ali "
                },
            ])
          });
      
          it('expect to get one user', async () => {
            Request
            .get('/api/user/1')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                username:"MohamedAli ",
                firstName:"Mohamed ",
                lastName:"Ali "
            })
          });

          it('expect to update one user',()=>{
            const data = {
                username:"MohamedAli ",
                firstName:"Mohamed ",
                lastName:"Ali ",
                password: '1234'
            }
            Request
            .patch('/api/user/1')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                username:"MohamedAli ",
                firstName:"Mohamed ",
                lastName:"Ali ",
                password: '1234',
          })
        });
        it('expected to Delete one user',()=>{
            Request.delete('/api/user/1')
            .expect(200);
        });
    })
})