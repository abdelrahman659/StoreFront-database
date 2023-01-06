import UserModel from "../../models/users.model";

const userModel = new UserModel();

describe('Test UserModel',()=>{
    it('expect to create User',async()=>{
        const user = await userModel.create({
            username:"MohamedAli ",
            firstName:"Mohamed ",
            lastName:"Ali ",
            password:"1234"
        })
        expect(user.username).toEqual("MohamedAli");
    });

    it('expect to return All users',async()=>{
        const users = await userModel.getAllUsers();
        expect(users.length).toEqual(1);
    });

    it('expect to return Correct user',async()=>{
        const user = await userModel.getAllUsers();
        const Id = user[0].id as number;

        const specUser = await userModel.getOne(Id);
        expect(specUser.username).toEqual("MohamedAli");

    });
    it('expect to update One user',async()=>{
        // get All user And then  Select One by ID to update
        const users = await userModel.getAllUsers();
        const Id = users[0].id as number;

        const update = await userModel.updateOneUser({
            id:Id,
            username:"MohamedAli ",
            firstName:"Mohamed ",
            lastName:"Ali ",
            password:"1234"
        });
        expect(update.username).toEqual("MohamedAli");
    });

    it('expect to Delete specific user',async()=>{
        // get All user And then  Select One by ID to Delete
        let users = await userModel.getAllUsers();
        const Id = users[0].id as number;
// use user id to Delete this user
        await userModel.deleteUser(Id);
        // get All users to check if this user Delete ot Not
         users = await userModel.getAllUsers();
         expect(users.length).toEqual(0);
    })
})