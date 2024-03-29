import bcrypt from 'bcryptjs';
import { raw } from 'body-parser';
import db from '../models/index';


const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashUserPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve('ok create');
        } catch (e) {
            reject(e)
        }
    })
}
// hash password
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}
let getUserInfoById = (UserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: UserId },
                raw: true,
            })
            if (user) {
                resolve(user)
            }
            else {
                resolve({})
            }
        }
        catch (e) {
            reject(e)
        }
    })

}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }
            else {
                resolve()
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

let deleteUserById = (UserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: UserId },
            })
            if (user) {
                await user.destroy();

                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }
            else {
                resolve({})
            }
        }
        catch (e) {
            reject(e)
        }
    })

}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}